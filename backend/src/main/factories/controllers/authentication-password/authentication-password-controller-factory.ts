import { makeAuthenticationPasswordValidation } from './authentication-password-validation-factory'
import { Controller } from '../../../../presentation/protocols'
import { Pool } from 'mysql'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { makeDbauthenticationPassword } from '../../usecases/authentication-password/db-authentication-password-factory'
import { AuthenticationPasswordController } from '../../../../presentation/controller/authenticationPassword/authentication-password-controller'

export const makeAuthenticationPasswordController = (pool: Pool): Controller => {
  const authenticationPasswordController = new AuthenticationPasswordController(makeDbauthenticationPassword(pool), makeAuthenticationPasswordValidation())
  const logMysqlRepository = new LogMysqlRepository(pool)
  return new LogControllerDecorator(authenticationPasswordController, logMysqlRepository)
}
