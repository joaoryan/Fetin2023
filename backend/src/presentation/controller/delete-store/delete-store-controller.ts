/* eslint-disable eol-last */
import { DeleteStore } from '../../../domain/usecases/delete-store'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './delete-store-controller-protocols'

export class DeleteStoreController implements Controller {
  private readonly storeValidation: Validation
  private readonly deleteStore: DeleteStore

  constructor (storeValidation: Validation, deleteStore: DeleteStore) {
    this.storeValidation = storeValidation
    this.deleteStore = deleteStore
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.storeValidation.validate(httpRequest.params)
      if (error) return badRequest(new MissingParamError('id'))
      const { id } = httpRequest.params
      if (typeof (id) === 'undefined') {
        return badRequest(new InvalidParamError('id'))
      } else {
        await this.deleteStore.deleteStore(id)
        return ok({})
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
