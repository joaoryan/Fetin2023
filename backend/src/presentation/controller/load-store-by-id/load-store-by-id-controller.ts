import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadStoreById, Validation } from './load-store-by-id-controller-protocols'

export class LoadStoreByIdController implements Controller {
  private readonly loadStoreById: LoadStoreById
  private readonly validation: Validation
  constructor (loadStoreById: LoadStoreById, validation: Validation) {
    this.loadStoreById = loadStoreById
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const { id } = httpRequest.params
      const store = await this.loadStoreById.loadStoreById(id)
      if (!store) return noContent()
      return ok(store)
    } catch (error) {
      return serverError(error)
    }
  }
}
