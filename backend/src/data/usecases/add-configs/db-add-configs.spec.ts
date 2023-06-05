/* eslint-disable no-undef */
import { ConfigsModel } from '../../../domain/models/configs'
import { AddConfigsModel } from '../../../domain/usecases/add-configs'
import { AddConfigsRepository } from '../../protocols/db/configs/add-configs-repository'
import { DbAddConfigs } from './db-add-configs'
import { mockAddUserConfigs, mockReturnUserConfigs } from '../../../domain/mocks/user'

const makeAddConfigsRepository = (): AddConfigsRepository => {
  class AddConfigsRepositoryStub implements AddConfigsRepository {
    async add (configsData: AddConfigsModel): Promise<ConfigsModel> {
      return new Promise(resolve => resolve(mockReturnUserConfigs()))
    }
  }

  return new AddConfigsRepositoryStub()
}

interface SutTypes {
  sut: DbAddConfigs
  addConfigsRepositoryStub: AddConfigsRepository
}

const makeSut = (): SutTypes => {
  const addConfigsRepositoryStub = makeAddConfigsRepository()
  const sut = new DbAddConfigs(addConfigsRepositoryStub)

  return {
    sut,
    addConfigsRepositoryStub
  }
}

describe('DbAddConfigs Usecase', () => {
  test('Should call AddConfigsRepository with correct values', async () => {
    const { sut, addConfigsRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(addConfigsRepositoryStub, 'add')
    const config = await mockAddUserConfigs()
    await sut.add(config)
    expect(loadSpy).toHaveBeenCalledWith(config)
  })
})
