import { Pool } from 'mysql'
import { LogMysqlRepository } from '../../../../infra/db/mysql/log/log-mysql-repository'
import { DownloadUpdateController } from '../../../../presentation/controller/download-update/download-update-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbDownloadUpdate } from '../../usecases/download-update/db-download-update'
import { makeDownloadUpdateValidation } from './download-update-validation-factory'

export const makeDownloadUpdateController = (pool: Pool): Controller => {
  const logMysqlRepository = new LogMysqlRepository(pool)
  const downloadUpdateController = new DownloadUpdateController(makeDbDownloadUpdate(), makeDownloadUpdateValidation())
  return new LogControllerDecorator(downloadUpdateController, logMysqlRepository)
}
