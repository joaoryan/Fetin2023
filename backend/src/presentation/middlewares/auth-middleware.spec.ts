/* eslint-disable no-undef */
import { AuthMiddleware } from './auth-middleware'
import { forbidden, ok } from '../helpers/http-helper'
import { AccessDeniedError } from '../errors'
import { LoadUserByToken } from '../../domain/usecases/load-user-by-token'
import { HttpRequest } from '../protocols'
import { UserModel } from '../../domain/models/user'

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeFakeUser = (): UserModel => ({
  id: 1,
  userName: 'valid_name',
  email: 'valid_email@mail.com',
  emailVerified: true,
  companyId: 1,
  phone: 'valid_phone',
  password: 'valid_password',
  creationDate: '2022-04-13',
  userTypeId: 'cli',
  activateToken: 'pinIOK'
})

const makeVerifyToken = (): LoadUserByToken => {
  class LoadAccountByTokenStub implements LoadUserByToken {
    async load (accessToken: string, role?: string): Promise<UserModel> {
      return new Promise(resolve => resolve(makeFakeUser()))
    }
  }

  return new LoadAccountByTokenStub()
}

interface SutTypes {
  sut: AuthMiddleware
  loadUserByToken: LoadUserByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadUserByToken = makeVerifyToken()
  const sut = new AuthMiddleware(loadUserByToken, role)
  return {
    sut,
    loadUserByToken
  }
}

describe('Authentication Middleware', () => {
  test('Should return 403 if no x-access-token is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct access token and role', async () => {
    const role = 'any_role'
    const { sut, loadUserByToken } = makeSut(role)
    const verifySpy = jest.spyOn(loadUserByToken, 'load')
    await sut.handle(makeFakeRequest())
    expect(verifySpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadUserByToken } = makeSut()
    jest.spyOn(loadUserByToken, 'load').mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ idUser: 1 }))
  })

  test('Should return 403 if LoadAccountByToken throws', async () => {
    const { sut, loadUserByToken } = makeSut()
    jest.spyOn(loadUserByToken, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new Error()))
  })
})
