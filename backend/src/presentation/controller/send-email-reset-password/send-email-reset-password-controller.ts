import { LoadUserByEmail } from '../../../domain/usecases/load-user-by-email'
import { getRecoverPasswordTemplate } from '../../../utils/factors/emailTemplate/templates'
import { MailService } from '../../../utils/send-email-adapter'
import { UserNotFoundError } from '../../errors'
import { SendEmailError } from '../../errors/send-email-error'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './send-email-reset-password-controller-protocols'

export class SendEmailResetPasswordController implements Controller {
  private readonly loadUserByEmail: LoadUserByEmail
  private readonly validation: Validation
  private readonly mailService: MailService;

  constructor (loadUserByEmail: LoadUserByEmail, validation: Validation, mailService: MailService) {
    this.loadUserByEmail = loadUserByEmail
    this.validation = validation
    this.mailService = mailService
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email } = httpRequest.body
      const user = await this.loadUserByEmail.loadUser(email)
      if (!user) return badRequest(new UserNotFoundError())
      const emailSend = await this.mailService.sendMail({
        from: 'suporte@praticabr.com',
        to: user.email,
        subject: 'Recuperação de senha',
        html: getRecoverPasswordTemplate(
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
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
