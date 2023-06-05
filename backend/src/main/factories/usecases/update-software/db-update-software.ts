import { FilesRepositoryEquipment } from '../../../../infra/db/files/files-repository'
import { DbUpdateSoftware } from '../../../../data/usecases/update-software/db-update-software'

export const makeDbUpdateSoftware = (): DbUpdateSoftware => {
  const loadEquipByRepository = new FilesRepositoryEquipment()
  return new DbUpdateSoftware(loadEquipByRepository)
}
