import { DownloadUpdate } from '../../../domain/usecases/download-update'
import { DownloadUpdateRepository } from '../../protocols/db/download-update/download-update-repository'

export class DbDownloadUpdate implements DownloadUpdate {
  private readonly repository: DownloadUpdateRepository
  constructor (repository: DownloadUpdateRepository) {
    this.repository = repository
  }

  async load (ovenModel: DownloadUpdateRepository.Params): Promise<DownloadUpdateRepository.Result> {
    return this.repository.downloadUpdate(ovenModel)
  }
}
