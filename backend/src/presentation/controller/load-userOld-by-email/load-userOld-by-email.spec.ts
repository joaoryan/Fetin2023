/* eslint-disable no-undef */
import { LoadUserByEmailController } from './load-userOld-by-email-controller'
import { ok, serverError } from '../../helpers/http-helper'
import { makeFakeRequestGetUserByEmail, mockReturnUserOld } from '../../../domain/mocks/user-old'
import { LoadUserOldByEmail } from '../../../domain/usecases/load-userOld-by-email'
import { UserOldModel } from '../../../domain/models/userOld'

class LoadUserOldByEmailStub implements LoadUserOldByEmail {
  loadUser (email: string): Promise<UserOldModel | null> {
    return new Promise(resolve => resolve(mockReturnUserOld()))
  }
}

interface SutTypes {
  sut: LoadUserByEmailController
  loadUserOldByEmailStub: LoadUserOldByEmail
}

const makeSut = (): SutTypes => {
  const loadUserOldByEmailStub = new LoadUserOldByEmailStub()
  const sut = new LoadUserByEmailController(loadUserOldByEmailStub)
  return {
    sut,
    loadUserOldByEmailStub
  }
}

describe('LoadUserOldByEmail Controller', () => {
  test('Should call loadUserOldByEmailStub with correct values', async () => {
    const { sut, loadUserOldByEmailStub } = makeSut()
    const loadRecipeSpy = jest.spyOn(loadUserOldByEmailStub, 'loadUser')
    const httpRequest = await makeFakeRequestGetUserByEmail()
    const { email } = httpRequest.params
    await sut.handle(httpRequest)
    expect(loadRecipeSpy).toHaveBeenCalledWith(email)
  })

  test('Should return 500 loadUserOldByEmail throws', async () => {
    const { sut, loadUserOldByEmailStub } = makeSut()
    jest.spyOn(loadUserOldByEmailStub, 'loadUser').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await makeFakeRequestGetUserByEmail()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await makeFakeRequestGetUserByEmail()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      user: mockReturnUserOld()
    }))
  })
})
