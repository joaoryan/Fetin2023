import { UpdateSoftware } from '../../../domain/usecases/update-software'
import { UpdateSoftwareRepository } from '../../protocols/db/update-software/update-software-repository'

export class DbUpdateSoftware implements UpdateSoftware {
  private readonly repository: UpdateSoftwareRepository
  constructor (repository: UpdateSoftwareRepository) {
    this.repository = repository
  }

  async load (ovenModel: UpdateSoftwareRepository.Params, iokPin: string): Promise<UpdateSoftwareRepository.Result> {
    return this.repository.updateSoftware(ovenModel, iokPin)
  }
}
