/* eslint-disable no-undef */
import { LoadUserByCorporateNameController } from './load-user-by-corporateName-controller'
import { ok, serverError } from '../../helpers/http-helper'
import { makeFakeRequestGetUserByCorporateName, mockReturnUser } from '../../../domain/mocks/user'
import { LoadUserByCorporateName } from '../../../domain/usecases/load-user-by-corporateName'
import { UserModel } from '../../../domain/models/user'

class LoadUserByCorporateNameStub implements LoadUserByCorporateName {
  loadUser (corporateName: string): Promise<UserModel | null> {
    return new Promise(resolve => resolve(mockReturnUser()))
  }
}

interface SutTypes {
  sut: LoadUserByCorporateNameController
  loadUserByCorporateNameStub: LoadUserByCorporateName
}

const makeSut = (): SutTypes => {
  const loadUserByCorporateNameStub = new LoadUserByCorporateNameStub()
  const sut = new LoadUserByCorporateNameController(loadUserByCorporateNameStub)
  return {
    sut,
    loadUserByCorporateNameStub
  }
}

describe('LoadUserByCorporateName Controller', () => {
  test('Should call loadUserByCorporateNameStub with correct values', async () => {
    const { sut, loadUserByCorporateNameStub } = makeSut()
    const loadRecipeSpy = jest.spyOn(loadUserByCorporateNameStub, 'loadUser')
    const httpRequest = await makeFakeRequestGetUserByCorporateName()
    const { corporateName } = httpRequest.params
    await sut.handle(httpRequest)
    expect(loadRecipeSpy).toHaveBeenCalledWith(corporateName)
  })

  test('Should return 500 loadUserByCorporateName throws', async () => {
    const { sut, loadUserByCorporateNameStub } = makeSut()
    jest.spyOn(loadUserByCorporateNameStub, 'loadUser').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await makeFakeRequestGetUserByCorporateName()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await makeFakeRequestGetUserByCorporateName()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      user: mockReturnUser()
    }))
  })
})
