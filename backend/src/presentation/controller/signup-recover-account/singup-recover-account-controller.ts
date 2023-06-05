import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddUser,
  Validation,
  AddCompany,
  MailService,
  LoadEquipByPin,
  UpdateEquipByCompany
} from './signup-recover-account-controller-protocols'
import {
  badRequest,
  serverError,
  ok,
  forbidden
} from '../../helpers/http-helper'
import { EmailInUseError } from '../../errors'
import { CompanyExistsError } from '../../errors/company-already- exists-error'
import { SendEmailError } from '../../errors/send-email-error'
import { getAccountActivationTemplate } from '../../../utils/factors/emailTemplate/templates'
import { AddConfigs } from '../../../domain/usecases/add-configs'

export class SignupRecoverAccountController implements Controller {
  private readonly addUser: AddUser;
  private readonly addCompany: AddCompany;
  private readonly userValidation: Validation;
  private readonly companyValidation: Validation;
  private readonly mailService: MailService;
  private readonly addConfigs: AddConfigs;

  constructor(
    addUser: AddUser,
    addCompany: AddCompany,
    addConfigs: AddConfigs,
    userValidation: Validation,
    companyValidation: Validation,
    mailService: MailService,
    loadEquipByPin: LoadEquipByPin,
    updateEquipByCompany: UpdateEquipByCompany
  ) {
    this.addUser = addUser
    this.addCompany = addCompany
    this.userValidation = userValidation
    this.companyValidation = companyValidation
    this.mailService = mailService
    this.addConfigs = addConfigs
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const companyError = this.companyValidation.validate(
        httpRequest.body.company
      )
      if (companyError) {
        return badRequest(companyError)
      }

      const userError = this.userValidation.validate(httpRequest.body.user)
      if (userError) {
        return badRequest(userError)
      }


      const {
        corporateName,
        companyType
      } = httpRequest.body.company
      const company = await this.addCompany.add({
        corporateName,
        companyType
      })
      if (!company) {
        return forbidden(new CompanyExistsError())
      }

      const { userName, email, phone, password, creationDate, language } = httpRequest.body.user
      const user = await this.addUser.add({
        userName,
        email,
        emailVerified: false,
        companyId: company.id,
        phone,
        password,
        creationDate,
        userTypeId: 'admCli',
        activateToken: null
      })
      if (!user) {
        return forbidden(new EmailInUseError())
      }

      const configs = await this.addConfigs.add({
        userId: user.id,
        language: language,
        tempUnit: '°C',
        weightUnit: 'Gramas',
        theme: 'Light'
      })

      const emailSend = await this.mailService.sendMail({
        from: 'suporte@praticabr.com',
        to: user.email,
        subject: 'Ativação de conta',
        html: getAccountActivationTemplate(
          user.userName,
          user.email,
          user.id,
          user.activateToken,
          'PT'
        )
      })
      if (!emailSend) {
        return forbidden(new SendEmailError())
      }

      return ok({
        user: user,
        company: company,
        configs: configs
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
