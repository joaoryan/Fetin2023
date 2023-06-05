/* eslint-disable no-undef */
import { ConfigsModel } from '../../../domain/models/configs'
import { UpdateConfigsModel } from '../../../domain/usecases/update-configs'
import { LoadConfigsByUserIdRepository } from '../../protocols/db/configs/load-configs-by-user-id-repository'
import { UpdateConfigsRepository } from '../../protocols/db/configs/update-configs-repository'
import { DbUpdateConfigs } from './db-update-configs'
import { mockReturnUserConfigs, mockUpdateUserConfigs } from '../../../domain/mocks/user'

const makeUpdateConfigsRepository = (): UpdateConfigsRepository => {
  class UpdateConfigsRepositoryStub implements UpdateConfigsRepository {
    async updateConfigs (configs: UpdateConfigsModel): Promise<ConfigsModel> {
      return new Promise(resolve => resolve(mockReturnUserConfigs()))
    }
  }
  return new UpdateConfigsRepositoryStub()
}

const makeLoadConfigsByIdRepository = (): LoadConfigsByUserIdRepository => {
  class LoadConfigsByIdRepositoryStub implements LoadConfigsByUserIdRepository {
    async loadByUserId (id: number): Promise<ConfigsModel | null> {
      return new Promise(resolve => resolve(mockReturnUserConfigs()))
    }
  }
  return new LoadConfigsByIdRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateConfigs
  updateConfigsRepositoryStub: UpdateConfigsRepository
  loadConfigsByIdRepositoryStub: LoadConfigsByUserIdRepository
}

const makeSut = (): SutTypes => {
  const updateConfigsRepositoryStub = makeUpdateConfigsRepository()
  const loadConfigsByIdRepositoryStub = makeLoadConfigsByIdRepository()
  const sut = new DbUpdateConfigs(updateConfigsRepositoryStub, loadConfigsByIdRepositoryStub)
  return {
    sut,
    updateConfigsRepositoryStub,
    loadConfigsByIdRepositoryStub
  }
}

describe('DbUpdateConfigs Usecase', () => {
  test('Should call UpdateConfigsRepository with correct values', async () => {
    const { sut, updateConfigsRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(updateConfigsRepositoryStub, 'updateConfigs')
    const configs = await mockUpdateUserConfigs()
    await sut.updateConfigs(configs)
    expect(addSpy).toHaveBeenCalledWith(configs)
  })

  test('Should throw if UpdateConfigsRepository thows', async () => {
    const { sut, updateConfigsRepositoryStub } = makeSut()
    jest.spyOn(updateConfigsRepositoryStub, 'updateConfigs').mockRejectedValue(new Error())
    const promise = sut.updateConfigs(await mockUpdateUserConfigs())
    await expect(promise).rejects.toThrow()
  })
})
