/* eslint-disable eol-last */
import { DeleteGroup } from '../../../domain/usecases/delete-group'
import { InvalidParamError, MissingParamError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './delete-group-controller-protocols'

export class DeleteGroupController implements Controller {
  private readonly groupValidation: Validation
  private readonly deleteGroup: DeleteGroup

  constructor (groupValidation: Validation, deleteGroup: DeleteGroup) {
    this.groupValidation = groupValidation
    this.deleteGroup = deleteGroup
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const error = this.groupValidation.validate(httpRequest.params)
      if (error) return badRequest(new MissingParamError('id'))
      if (typeof (id) === 'undefined') return badRequest(new InvalidParamError('id'))
      const deleteIsOk = await this.deleteGroup.deleteGroup(id)
      if (!deleteIsOk) return badRequest(new NoRowsAffected(id))
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
