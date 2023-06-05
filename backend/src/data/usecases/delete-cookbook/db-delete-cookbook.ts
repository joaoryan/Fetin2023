import { DeleteCookbook } from '../../../domain/usecases/delete-cookbook'
import { DeleteCookbookRepository } from '../../protocols/db/cookbook/delete-cookbook-repository'
import { DeleteCombiOvenCMAXRepository } from '../../protocols/db/recipe/delete-step-CombiOvenCMAX-repository'
import { DeleteCombiOvenTSIRepository } from '../../protocols/db/recipe/delete-step-CombiOvenTSI-repository'
import { DeleteStepSpeedOvenRepository } from '../../protocols/db/recipe/delete-step-SpeedOven-repository'

export class DbDeleteCookbook implements DeleteCookbook {
  private readonly deleteCookbookRepository: DeleteCookbookRepository
  private readonly deleteStepSpeedOvenRepository: DeleteStepSpeedOvenRepository
  private readonly deleteCombiOvenTSIRepository: DeleteCombiOvenTSIRepository
  private readonly deleteCombiOvenCMAXRepository: DeleteCombiOvenCMAXRepository

  constructor (deleteCookbookRepository: DeleteCookbookRepository, deleteStepSpeedOvenRepository: DeleteStepSpeedOvenRepository, deleteCombiOvenTSIRepository: DeleteCombiOvenTSIRepository, deleteCombiOvenCMAXRepository: DeleteCombiOvenCMAXRepository) {
    this.deleteCookbookRepository = deleteCookbookRepository
    this.deleteStepSpeedOvenRepository = deleteStepSpeedOvenRepository
    this.deleteCombiOvenTSIRepository = deleteCombiOvenTSIRepository
    this.deleteCombiOvenCMAXRepository = deleteCombiOvenCMAXRepository
  }

  async deleteCookbook (id: number, equipType: number): Promise<boolean> {
    if (equipType === 4) {
      await this.deleteCombiOvenCMAXRepository.deleteCombiOvenCMAX(id)
    } else if (equipType === 2) {
      await this.deleteCombiOvenTSIRepository.deleteCombiOvenTSI(id)
    } else {
      await this.deleteStepSpeedOvenRepository.deleteSpeedOven(id)
    }
    return await this.deleteCookbookRepository.deleteCookbook(id)
  }
}
