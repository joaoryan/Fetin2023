import { LoadEquipById } from '../../../domain/usecases/load-equip-by-id'
import { ServerError } from '../../errors'
import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class LoadEquipByIdController implements Controller {
  private readonly loadEquipById: LoadEquipById
  private readonly validation: Validation
  constructor (loadEquipById: LoadEquipById, validation: Validation) {
    this.loadEquipById = loadEquipById
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest<LoadEquipById.Request>): Promise<HttpResponse<LoadEquipById.Response>> {
    try {
      const validationError = this.validation.validate(httpRequest.params)
      if (validationError) return badRequest(validationError)
      const response = await this.loadEquipById.load(httpRequest.params.id)
      if (!response) return noContent()
      return ok(response)
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
