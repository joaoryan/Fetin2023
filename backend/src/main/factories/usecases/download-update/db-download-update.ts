import { FilesRepository } from '../../../../infra/db/files/files-repository'
import { DbDownloadUpdate } from '../../../../data/usecases/download-update/db-download-update'

export const makeDbDownloadUpdate = (): DbDownloadUpdate => {
  const loadEquipByRepository = new FilesRepository()
  return new DbDownloadUpdate(loadEquipByRepository)
}
