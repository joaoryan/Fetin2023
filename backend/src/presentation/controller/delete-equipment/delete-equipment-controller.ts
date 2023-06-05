
import { DeleteEquipment } from '../../../domain/usecases/delete-equipment'
import { MissingParamError, ServerError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class DeleteEquipmentController implements Controller {
  private readonly paramsValidation: Validation
  private readonly dbDeleteEquipment: DeleteEquipment
  constructor (paramsValidation: Validation, dbDeleteEquipment: DeleteEquipment) {
    this.paramsValidation = paramsValidation
    this.dbDeleteEquipment = dbDeleteEquipment
  }

  async handle (httpRequest: HttpRequest<DeleteEquipment.Request>): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const validationError = this.paramsValidation.validate(httpRequest.params)
      if (validationError) return badRequest(new MissingParamError('id'))
      const deleteIsOk = await this.dbDeleteEquipment.delete(httpRequest.params.id)
      if (!deleteIsOk) return badRequest(new NoRowsAffected(httpRequest.params.id))
      return ok({})
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
