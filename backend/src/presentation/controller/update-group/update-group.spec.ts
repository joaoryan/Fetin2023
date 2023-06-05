/* eslint-disable no-undef */
import { Validation } from './Update-group-controller-protocols'
import { UpdateGroupController } from './Update-group-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UpdateGroupModel, UpdateGroup } from '../../../domain/usecases/Update-group'
import { MenuGroupModel } from '../../../domain/models/menu-group'
import { mockReturnGroup, mockUpdateGroupRequest } from '../../../domain/mocks/menus'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeUpdateGroup = (): UpdateGroup => {
  class UpdateGroupStub implements UpdateGroup {
    async updateGroup (group: UpdateGroupModel): Promise<MenuGroupModel> {
      return new Promise(resolve => resolve(mockReturnGroup()))
    }
  }
  return new UpdateGroupStub()
}

interface SutTypes {
  sut: UpdateGroupController
  groupValidationStub: Validation
  updateGroupStub: UpdateGroup
}

const makeSut = (): SutTypes => {
  const groupValidationStub = makeValidation()
  const updateGroupStub = makeUpdateGroup()
  const sut = new UpdateGroupController(groupValidationStub, updateGroupStub)
  return {
    sut,
    groupValidationStub,
    updateGroupStub
  }
}

describe('UpdateGroup Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, groupValidationStub } = makeSut()
    const validateSpy = jest.spyOn(groupValidationStub, 'validate')
    const httpRequest = await mockUpdateGroupRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.group)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, groupValidationStub } = makeSut()
    jest.spyOn(groupValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockUpdateGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call UpdateGroup with correct values', async () => {
    const { sut, updateGroupStub } = makeSut()
    const addMenuSpy = jest.spyOn(updateGroupStub, 'updateGroup')
    const httpRequest = await mockUpdateGroupRequest()
    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(httpRequest.body.group)
  })

  test('Should return 500 UpdateGroup throws', async () => {
    const { sut, updateGroupStub } = makeSut()
    jest.spyOn(updateGroupStub, 'updateGroup').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockUpdateGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockUpdateGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})
