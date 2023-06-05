import { UpdateStore } from '../../../domain/usecases/update-store'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './update-store-controller-protocols'
import { MissingParamError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'

export class UpdateStoreController implements Controller {
  private readonly bodyValidation: Validation
  private readonly paramsValidation: Validation
  private readonly updateStore: UpdateStore

  constructor (bodyValidation: Validation, paramsValidation: Validation, updateStore: UpdateStore) {
    this.bodyValidation = bodyValidation
    this.paramsValidation = paramsValidation
    this.updateStore = updateStore
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.store) return badRequest(new MissingParamError('store'))
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const validationParamsError = this.paramsValidation.validate(httpRequest.params)
      const validationBodyError = this.bodyValidation.validate(httpRequest.body.store)
      if (validationParamsError) return badRequest(validationParamsError)
      if (validationBodyError) return badRequest(validationBodyError)
      const result = await this.updateStore.updateStore(httpRequest.params.id, httpRequest.body.store)
      if (!result) return badRequest(new NoRowsAffected(httpRequest.params.id))
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
