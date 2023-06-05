/* eslint-disable eol-last */
import { UpdateGroup } from '../../../domain/usecases/Update-group'
import { MissingParamError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './update-group-controller-protocols'

export class UpdateGroupController implements Controller {
  private readonly groupValidation: Validation
  private readonly updateGroup: UpdateGroup

  constructor (groupValidation: Validation, updateGroup: UpdateGroup) {
    this.groupValidation = groupValidation
    this.updateGroup = updateGroup
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.group) return badRequest(new MissingParamError('group'))
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const error = this.groupValidation.validate(httpRequest.body.group)
      if (error) return badRequest(error)
      const groupRequest = httpRequest.body.group
      const group = await this.updateGroup.updateGroup(groupRequest)
      if (!group) return badRequest(new NoRowsAffected(httpRequest.params.id))
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
