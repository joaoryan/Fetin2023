/* eslint-disable no-undef */
import { DbLoadStepsSpeedOvenByRecipeId } from './db-load-step-SpeedOven-by-recipe-id'
import { LoadStepsSpeedOvenByRecipeIdRepository } from '../../protocols/db/step/load-step-SpeedOven-by-recipe-id-repository'
import { StepSpeedOvenModel } from '../add-step-SpeedOven/db-add-step-SpeedOven-protocols'
import { mockReturnStepSpeedOven, mockInsertStepSpeedOven } from '../../../domain/mocks/menus'

const makeLoadStepSpeedOvenByRecipeIdRepository = (): LoadStepsSpeedOvenByRecipeIdRepository => {
  class LoadStepSpeedOvenByRecipeIdRepositoryStub implements LoadStepsSpeedOvenByRecipeIdRepository {
    async loadStepsSpeedOvenByRecipeId (idRecipe: number): Promise<StepSpeedOvenModel[]> {
      return new Promise(resolve => resolve([mockReturnStepSpeedOven()]))
    }
  }
  return new LoadStepSpeedOvenByRecipeIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadStepsSpeedOvenByRecipeId
  loadStepSpeedOvenByRecipeIdRepositoryStub: LoadStepsSpeedOvenByRecipeIdRepository
}

const makeSut = (): SutTypes => {
  const loadStepSpeedOvenByRecipeIdRepositoryStub = makeLoadStepSpeedOvenByRecipeIdRepository()
  const sut = new DbLoadStepsSpeedOvenByRecipeId(loadStepSpeedOvenByRecipeIdRepositoryStub)
  return {
    sut,
    loadStepSpeedOvenByRecipeIdRepositoryStub
  }
}

describe('DbLoadStepsSpeedOvenByRecipeId usecase', () => {
  test('Should call LoadStepSpeedOvenByRecipeId with correct values', async () => {
    const { sut, loadStepSpeedOvenByRecipeIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadStepSpeedOvenByRecipeIdRepositoryStub, 'loadStepsSpeedOvenByRecipeId')
    const stepSpeedOvenResult = await mockInsertStepSpeedOven()
    await sut.loadStepsSpeedOvenByRecipeId(stepSpeedOvenResult.idRecipe)
    expect(loadSpy).toHaveBeenCalledWith(stepSpeedOvenResult.idRecipe)
  })

  test('Should throw if LoadStepSpeedOvenByRecipeId throws', async () => {
    const { sut, loadStepSpeedOvenByRecipeIdRepositoryStub } = makeSut()
    jest.spyOn(loadStepSpeedOvenByRecipeIdRepositoryStub, 'loadStepsSpeedOvenByRecipeId').mockRejectedValue(new Error())
    await expect(sut.loadStepsSpeedOvenByRecipeId(1)).rejects.toThrow()
  })
})
