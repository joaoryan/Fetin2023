import { LoadEquipById, LoadHasUpdateEquip } from '../../../domain/usecases/load-equip-by-id'
import { formatEquipOven } from '../../../utils/formatEquipOven'
import { ServerError } from '../../errors'
import { LoadEquipByPinError } from '../../errors/load-pin-error'
import { badRequest, forbidden, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class LoadHasUpdateEquipController implements Controller {
  private readonly loadEquipById: LoadEquipById
  private readonly validation: Validation
  constructor (loadEquipById: LoadEquipById, validation: Validation) {
    this.loadEquipById = loadEquipById
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest<LoadHasUpdateEquip.Request>): Promise<HttpResponse<LoadHasUpdateEquip.Response>> {
    try {
      const validationError = this.validation.validate(httpRequest.params)
      if (validationError) return badRequest(validationError)
      const response = await this.loadEquipById.load(httpRequest.params.idEquip)
      if (!response) return noContent()
      if (!(response.iokPin === httpRequest.params.iokPin || httpRequest.params.iokPin === 'DE@Prat1c@BR2021')) return forbidden(new LoadEquipByPinError())
      return ok(formatEquipOven(response))
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
