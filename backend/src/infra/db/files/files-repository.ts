import { DownloadUpdateRepository } from '../../../data/protocols/db/download-update/download-update-repository'
import path from 'path'
import { UpdateSoftwareRepository } from '../../../data/protocols/db/update-software/update-software-repository'
export class FilesRepository implements DownloadUpdateRepository {
  async downloadUpdate (ovenModel: DownloadUpdateRepository.Params): Promise<DownloadUpdateRepository.Result> {
    const filePath = path.resolve(__dirname, '../../../../public/update/')
    switch (ovenModel) {
      case 'COPA':
        return path.resolve(filePath, 'PraticaUi.tar')
      case 'COPA SM':
        return path.resolve(filePath, 'PraticaUi.tar')
      case 'ROCKET':
        return path.resolve(filePath, 'PraticaUi.tar')
      case 'FIT':
        return path.resolve(filePath, 'FIT.tar')
      case 'FORZA':
        return path.resolve(filePath, 'FORZA.tar')
      case 'TSI':
        return path.resolve(filePath, 'Package.tar')
      default:
        return ''
    }
  }
}

export class FilesRepositoryEquipment implements UpdateSoftwareRepository {
  async updateSoftware (ovenModel: DownloadUpdateRepository.Params, iokPin: string): Promise<UpdateSoftwareRepository.Result> {
    const filePath = path.resolve(__dirname, '../../../../public/update/')
    switch (ovenModel) {
      case 'COPA':
        return path.resolve(filePath, 'PraticaUi.tar')
      case 'COPA SM':
        return path.resolve(filePath, 'PraticaUi.tar')
      case 'ROCKET':
        return path.resolve(filePath, 'PraticaUi.tar')
      case 'FIT':
        return path.resolve(filePath, 'FIT.tar')
      case 'FORZA':
        return path.resolve(filePath, 'FORZA.tar')
      case 'TSI':
        return path.resolve(filePath, 'Package.tar')
      default:
        return ''
    }
  }
}
