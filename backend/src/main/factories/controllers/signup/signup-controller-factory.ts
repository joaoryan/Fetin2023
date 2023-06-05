import { SignUpController } from '../../../../presentation/controller/signup/singUp-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { Pool } from 'mysql'
import { makeSignUpUserValidation } from './signup-user-validation-factory'
import { makeDbAddUser } from '../../usecases/add-user/db-add-user-factory'
import { makeDbAddCompany } from '../../usecases/add-company/db-add-company-factory'
import { makeLoadEquipByPin } from '../../usecases/load-equip-by-pin/db-load-equip-by-pin-factory'
import { makeUpdateEquipByCompany } from '../../usecases/register-equip-by-company/db-Update-equip-by-company-factory'
import { makeSignUpCompanyValidation } from './signup-company-validation-factory'
import { MailService } from '../../../../utils/send-email-adapter'
import { makeDbAddConfigs } from '../../usecases/add-configs-factory/db-add-configs-factory'

export const makeSignUpController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const signUpController = new SignUpController(makeDbAddUser(pool), makeDbAddCompany(pool), makeDbAddConfigs(pool), makeSignUpUserValidation(), makeSignUpCompanyValidation(), new MailService(), makeLoadEquipByPin(pool), makeUpdateEquipByCompany(pool))

  return new LogControllerDecorator(signUpController, logMysqlRepository)
}
