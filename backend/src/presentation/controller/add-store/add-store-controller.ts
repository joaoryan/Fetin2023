import { StoreModel } from '../../../domain/models/store'
import { AddStore } from '../../../domain/usecases/add-store'
import { CreateStoreError } from '../../errors/create-store-error'
import { StoreParamsError } from '../../errors/store-params-error'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-store-controller-protocols'

export class AddStoreController implements Controller {
  private readonly storeValidation: Validation
  private readonly addStore: AddStore

  constructor (storeValidation: Validation, addStore: AddStore) {
    this.storeValidation = storeValidation
    this.addStore = addStore
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.store) return badRequest(new StoreParamsError())
      const storeRequest = httpRequest.body.store
      const error = this.storeValidation.validate(storeRequest)
      if (error) {
        return badRequest(error)
      }
      const store = await this.addStore.addStore(storeRequest)
      return created<StoreModel>(store)
    } catch (error) {
      return serverError(new CreateStoreError())
    }
  }
}
