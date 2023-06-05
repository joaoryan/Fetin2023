
import { CountEquipment } from '../../../domain/usecases/count-equipment'
import { InvalidParamError, ServerError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class CountEquipmentController implements Controller {
  private readonly validation: Validation
  private readonly db: CountEquipment
  constructor (validation: Validation, db: CountEquipment) {
    this.validation = validation
    this.db = db
  }

  async handle (httpRequest: HttpRequest<CountEquipment.Request>): Promise<HttpResponse> {
    try {
      const { where } = httpRequest.query
      if (where) {
        const validationError = this.validation.validate(where)
        if (validationError) return badRequest(new InvalidParamError(Object.keys(where)[0]))
      }
      const count = await this.db.count(where)
      return ok(count)
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
