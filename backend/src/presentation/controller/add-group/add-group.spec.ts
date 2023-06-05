/* eslint-disable no-undef */
import { Validation } from './add-group-controller-protocols'
import { AddGroupController } from './add-group-controller'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { AddGroupModel, AddGroup } from '../../../domain/usecases/add-group'
import { MenuGroupModel } from '../../../domain/models/menu-group'
import { mockAddGroupRequest, mockReturnGroup } from '../../../domain/mocks/menus'
import { GroupParamsError } from '../../errors/group-params-error'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddGroup = (): AddGroup => {
  class AddGroupStub implements AddGroup {
    async addGroup (group: AddGroupModel): Promise<MenuGroupModel> {
      return mockReturnGroup()
    }
  }
  return new AddGroupStub()
}

interface SutTypes {
  sut: AddGroupController
  groupValidationStub: Validation
  addGroupStub: AddGroup
}

const makeSut = (): SutTypes => {
  const groupValidationStub = makeValidation()
  const addGroupStub = makeAddGroup()
  const sut = new AddGroupController(groupValidationStub, addGroupStub)
  return {
    sut,
    groupValidationStub,
    addGroupStub
  }
}

describe('Testando a classe AddGroupController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, groupValidationStub } = makeSut()
    const validateSpy = jest.spyOn(groupValidationStub, 'validate')
    const httpRequest = await mockAddGroupRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.group)
  })

  test('Should call addGroup with correct values', async () => {
    const { sut, addGroupStub } = makeSut()
    const addMenuSpy = jest.spyOn(addGroupStub, 'addGroup')
    const httpRequest = await mockAddGroupRequest()
    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(httpRequest.body.group)
  })

  test('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockAddGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(created<MenuGroupModel>(mockReturnGroup()))
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, groupValidationStub } = makeSut()
    jest.spyOn(groupValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = await mockAddGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should return 500 AddGroup throws', async () => {
    const { sut, addGroupStub } = makeSut()
    jest.spyOn(addGroupStub, 'addGroup').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockAddGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 400 if the group object is not in the body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: {} })
    expect(httpResponse).toEqual(badRequest(new GroupParamsError()))
  })
})
