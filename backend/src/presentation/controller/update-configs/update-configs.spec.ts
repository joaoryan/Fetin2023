/* eslint-disable no-undef */
import { Validation } from './update-configs-controller-protocols'
import { UpdateConfigsController } from './update-configs-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UpdateConfigsModel, UpdateConfigs } from '../../../domain/usecases/update-configs'
import { ConfigsModel } from '../../../domain/models/configs'
import { makeFakeRequestUserConfig, mockReturnUserConfigs } from '../../../domain/mocks/user'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeUpdateConfigs = (): UpdateConfigs => {
  class UpdateConfigsStub implements UpdateConfigs {
    async updateConfigs (configs: UpdateConfigsModel): Promise<ConfigsModel> {
      return new Promise(resolve => resolve(mockReturnUserConfigs()))
    }
  }
  return new UpdateConfigsStub()
}

interface SutTypes {
  sut: UpdateConfigsController
  updateConfigsValidationStub: Validation
  updateConfigsStub: UpdateConfigs
}

const makeSut = (): SutTypes => {
  const updateConfigsValidationStub = makeValidation()
  const updateConfigsStub = makeUpdateConfigs()
  const sut = new UpdateConfigsController(updateConfigsValidationStub, updateConfigsStub)
  return {
    sut,
    updateConfigsValidationStub,
    updateConfigsStub
  }
}

describe('UpdateConfigs Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, updateConfigsValidationStub } = makeSut()
    const validateSpy = jest.spyOn(updateConfigsValidationStub, 'validate')
    const httpRequest = await makeFakeRequestUserConfig()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.userConfigs)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, updateConfigsValidationStub } = makeSut()
    jest.spyOn(updateConfigsValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(await makeFakeRequestUserConfig())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call UpdateConfigs with correct values', async () => {
    const { sut, updateConfigsStub } = makeSut()
    const UpdateConfigsSpy = jest.spyOn(updateConfigsStub, 'updateConfigs')
    const httpRequest = await makeFakeRequestUserConfig()
    await sut.handle(await makeFakeRequestUserConfig())
    expect(UpdateConfigsSpy).toHaveBeenCalledWith(httpRequest.body.userConfigs)
  })

  test('Should return 500 if UpdateConfigs throws', async () => {
    const { sut, updateConfigsStub } = makeSut()
    jest.spyOn(updateConfigsStub, 'updateConfigs').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(await makeFakeRequestUserConfig())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(await makeFakeRequestUserConfig())
    expect(httpResponse).toEqual(ok({ updatedConfigs: await mockReturnUserConfigs() }))
  })
})
