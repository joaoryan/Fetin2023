import { SignUpController } from '../../../../presentation/controller/signup/singUp-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { makeSignUpUserValidation } from './signup-user-validation-factory'
import { makeDbAddUser } from '../../usecases/add-user/db-add-user-factory'

export const makeSignUpController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const signUpController = new SignUpController(makeDbAddUser(pool), makeSignUpUserValidation())

  return new LogControllerDecorator(signUpController, logMysqlRepository)
}
