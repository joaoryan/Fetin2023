/* eslint-disable no-undef */
import { DbLoadStepSpeedOvenById } from './db-load-step-SpeedOven-by-id'
import { LoadStepSpeedOvenByIdRepository } from '../../protocols/db/step/load-step-SpeedOven-by-id-repository'
import { StepSpeedOvenModel } from '../add-step-SpeedOven/db-add-step-SpeedOven-protocols'
import { mockInsertStepSpeedOven, mockReturnStepSpeedOven } from '../../../domain/mocks/menus'

const makeLoadStepSpeedOvenByIdRepository = (): LoadStepSpeedOvenByIdRepository => {
  class LoadStepSpeedOvenByIdRepositoryStub implements LoadStepSpeedOvenByIdRepository {
    async loadStepSpeedOvenById (id: number): Promise<StepSpeedOvenModel> {
      return new Promise(resolve => resolve(mockReturnStepSpeedOven()))
    }
  }
  return new LoadStepSpeedOvenByIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadStepSpeedOvenById
  loadStepSpeedOvenByIdRepositoryStub: LoadStepSpeedOvenByIdRepository
}

const makeSut = (): SutTypes => {
  const loadStepSpeedOvenByIdRepositoryStub = makeLoadStepSpeedOvenByIdRepository()
  const sut = new DbLoadStepSpeedOvenById(loadStepSpeedOvenByIdRepositoryStub)
  return {
    sut,
    loadStepSpeedOvenByIdRepositoryStub
  }
}

describe('DbLoadStepSpeedOvenById usecase', () => {
  test('Should call LoadStepSpeedOvenById with correct values', async () => {
    const { sut, loadStepSpeedOvenByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadStepSpeedOvenByIdRepositoryStub, 'loadStepSpeedOvenById')
    const stepSpeedOvenResult = await mockInsertStepSpeedOven()
    await sut.loadStepSpeedOvenById(stepSpeedOvenResult.idStepSpeedOven)
    expect(loadSpy).toHaveBeenCalledWith(stepSpeedOvenResult.idStepSpeedOven)
  })

  test('Should throw if LoadStepSpeedOvenByIdRepository throws', async () => {
    const { sut, loadStepSpeedOvenByIdRepositoryStub } = makeSut()
    jest.spyOn(loadStepSpeedOvenByIdRepositoryStub, 'loadStepSpeedOvenById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadStepSpeedOvenById(1)
    await expect(promise).rejects.toThrow()
  })
})
