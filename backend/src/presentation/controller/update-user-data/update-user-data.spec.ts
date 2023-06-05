/* eslint-disable no-undef */
import { Validation } from './update-user-data-controller-protocols'
import { EditUserDataController } from './update-user-data-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { EditUserDataModel, EditUserData } from '../../../domain/usecases/update-user-data'
import { UserModel } from '../../../domain/models/user'
import { mockReturnUser, mockUpdateUserRequest } from '../../../domain/mocks/user'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeEditUserData = (): EditUserData => {
  class EditUserDataStub implements EditUserData {
    async editUserData (user: EditUserDataModel): Promise<UserModel> {
      return new Promise(resolve => resolve(mockReturnUser()))
    }
  }
  return new EditUserDataStub()
}

interface SutTypes {
  sut: EditUserDataController
  userDataValidationStub: Validation
  editUserDataStub: EditUserData
}

const makeSut = (): SutTypes => {
  const userDataValidationStub = makeValidation()
  const editUserDataStub = makeEditUserData()
  const sut = new EditUserDataController(userDataValidationStub, editUserDataStub)
  return {
    sut,
    userDataValidationStub,
    editUserDataStub
  }
}

describe('EditUserData Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, userDataValidationStub } = makeSut()
    const validateSpy = jest.spyOn(userDataValidationStub, 'validate')
    const httpRequest = await mockUpdateUserRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.user)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, userDataValidationStub } = makeSut()
    jest.spyOn(userDataValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(await mockUpdateUserRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call EditUserData with correct values', async () => {
    const { sut, editUserDataStub } = makeSut()
    const editUserDataSpy = jest.spyOn(editUserDataStub, 'editUserData')
    const httpRequest = await mockUpdateUserRequest()
    await sut.handle(httpRequest)
    expect(editUserDataSpy).toHaveBeenCalledWith(httpRequest.body.user)
  })

  test('Should return 500 if EditGroup throws', async () => {
    const { sut, editUserDataStub } = makeSut()
    jest.spyOn(editUserDataStub, 'editUserData').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(await mockUpdateUserRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(await mockUpdateUserRequest())
    expect(httpResponse).toEqual(ok({ editedUserData: mockReturnUser() }))
  })
})
