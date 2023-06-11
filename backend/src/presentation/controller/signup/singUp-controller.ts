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
} from './signup-controller-protocols'
import {
  badRequest,
  serverError,
  ok,
  forbidden
} from '../../helpers/http-helper'
import { EmailInUseError } from '../../errors'
import { CompanyExistsError } from '../../errors/company-already- exists-error'
import { LoadEquipByPinError } from '../../errors/load-pin-error'
import { SendEmailError } from '../../errors/send-email-error'
import { getAccountActivationTemplate } from '../../../utils/factors/emailTemplate/templates'
import { AddConfigs } from '../../../domain/usecases/add-configs'

export class SignUpController implements Controller {
  private readonly addUser: AddUser;
  private readonly userValidation: Validation;


  constructor(
    addUser: AddUser,
    userValidation: Validation
  ) {
    this.addUser = addUser
    this.userValidation = userValidation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userError = this.userValidation.validate(httpRequest.body.user)
      if (userError) {
        return badRequest(userError)
      }


      const { userName, email, phone, password, creationDate, language } =
        httpRequest.body.user
      const user = await this.addUser.add({
        userName,
        email,
        emailVerified: false,
        companyId: 1,
        phone,
        password,
        creationDate,
        userTypeId: 'admCli',
        activateToken: null
      })
      if (!user) {
        return forbidden(new EmailInUseError())
      }

      return ok({
        user: user
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
