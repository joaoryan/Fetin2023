import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { makeSendEmailResetPasswordValidation } from './send-email-reset-password-validation-factory'
import { MailService } from '../../../../utils/send-email-adapter'
import { SendEmailResetPasswordController } from '../../../../presentation/controller/send-email-reset-password/send-email-reset-password-controller'
import { makeDbLoadUser } from '../../usecases/load-user-by-email/db-load-user-by-email-factory'

export const makeSendEmailResetPasswordController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const signUpController = new SendEmailResetPasswordController(makeDbLoadUser(pool), makeSendEmailResetPasswordValidation(), new MailService())

  return new LogControllerDecorator(signUpController, logMysqlRepository)
}
