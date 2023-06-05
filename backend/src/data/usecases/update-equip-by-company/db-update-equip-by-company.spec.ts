/* eslint-disable no-undef */
import { DbUpdateEquipByCompany } from './db-update-equip-by-company'
import { RegisterEquipRepository } from '../../protocols/db/equipment/register-equip-repository'

const makeRegisterEquipRepositoryStubStub = (): RegisterEquipRepository => {
  class RegisterEquipRepositoryStub implements RegisterEquipRepository {
    registerEquip (idEquip: number, idCompany: number): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new RegisterEquipRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateEquipByCompany
  registerEquipRepositoryStub: RegisterEquipRepository
}

const makeSut = (): SutTypes => {
  const registerEquipRepositoryStub = makeRegisterEquipRepositoryStubStub()
  const sut = new DbUpdateEquipByCompany(registerEquipRepositoryStub)
  return {
    sut,
    registerEquipRepositoryStub
  }
}

describe('DbLoadEquipByPin usecase', () => {
  test('Should call loadByEquipPin with correct values', async () => {
    const { sut, registerEquipRepositoryStub } = makeSut()
    const loadPin = jest.spyOn(registerEquipRepositoryStub, 'registerEquip')
    await sut.update(1, 1)
    expect(loadPin).toHaveBeenCalledWith(1, 1)
  })
})
