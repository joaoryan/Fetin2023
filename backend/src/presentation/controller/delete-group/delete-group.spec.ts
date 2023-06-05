/* eslint-disable no-undef */
import { Validation } from './delete-group-controller-protocols'
import { DeleteGroupController } from './delete-group-controller'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { DeleteGroup } from '../../../domain/usecases/delete-group'
import { mockDeleteGroupRequest } from '../../../domain/mocks/menus'
import { MissingParamError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeDeleteGroup = (): DeleteGroup => {
  class DeleteGroupStub implements DeleteGroup {
    async deleteGroup (id: number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteGroupStub()
}

interface SutTypes {
  sut: DeleteGroupController
  groupValidationStub: Validation
  deleteGroupStub: DeleteGroup
}

const makeSut = (): SutTypes => {
  const groupValidationStub = makeValidation()
  const deleteGroupStub = makeDeleteGroup()
  const sut = new DeleteGroupController(groupValidationStub, deleteGroupStub)
  return {
    sut,
    groupValidationStub,
    deleteGroupStub
  }
}

describe('DeleteGroup Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, groupValidationStub } = makeSut()
    const validateSpy = jest.spyOn(groupValidationStub, 'validate')
    const httpRequest = await mockDeleteGroupRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should call deleteGroup with correct values', async () => {
    const { sut, deleteGroupStub } = makeSut()
    const deletGroupSpy = jest.spyOn(deleteGroupStub, 'deleteGroup')
    const httpRequest = await mockDeleteGroupRequest()
    await sut.handle(httpRequest)
    expect(deletGroupSpy).toHaveBeenCalledWith(httpRequest.params.id)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, groupValidationStub } = makeSut()
    jest.spyOn(groupValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('id'))
    const httpRequest = await mockDeleteGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('should return 400 if the delete method returns false ', async () => {
    const { sut, deleteGroupStub } = makeSut()
    jest.spyOn(deleteGroupStub, 'deleteGroup').mockResolvedValue(false)
    const httpRequest = await mockDeleteGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new NoRowsAffected(httpRequest.params.id)))
  })

  test('Should return 500 deleteGroup throws', async () => {
    const { sut, deleteGroupStub } = makeSut()
    jest.spyOn(deleteGroupStub, 'deleteGroup').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockDeleteGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockDeleteGroupRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({}))
  })
})
