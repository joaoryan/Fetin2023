import { forbidden, ok, serverError } from '../../helpers/http-helper'
import { UpdateEquipment } from '../../../domain/usecases/Update-equipment'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'
import { badRequest } from './../../helpers/http-helper'
import { MissingParamError, ServerError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'
import { LoadEquipByPin } from '../../../domain/usecases/load-equip-by-pin'
import { LoadEquipByPinError } from '../../errors/load-pin-error'

export class UpdateEquipmentController implements Controller {
  private readonly paramsValidation: Validation
  private readonly bodyValidation: Validation
  private readonly dbUpdateEquipment: UpdateEquipment
  private readonly loadEquipByPin: LoadEquipByPin
  constructor (paramsValidation: Validation, bodyValidation: Validation, dbUpdateEquipment: UpdateEquipment, loadEquipByPin: LoadEquipByPin) {
    this.paramsValidation = paramsValidation
    this.bodyValidation = bodyValidation
    this.dbUpdateEquipment = dbUpdateEquipment
    this.loadEquipByPin = loadEquipByPin
  }

  async handle (httpRequest: HttpRequest<UpdateEquipment.Request>): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.equipment) return badRequest(new MissingParamError('equipment'))
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const validationParamsError = this.paramsValidation.validate(httpRequest.params)
      const validationBodyError = this.bodyValidation.validate(httpRequest.body.equipment)
      if (validationParamsError) return badRequest(validationParamsError)
      if (validationBodyError) return badRequest(validationBodyError)
      const equip = await this.loadEquipByPin.load(httpRequest.body.equipment.iokPin)
      if (!equip) {
        return forbidden(new LoadEquipByPinError())
      }
      const result = await this.dbUpdateEquipment.update(equip.id, httpRequest.body.equipment)
      if (!result) return badRequest(new NoRowsAffected(httpRequest.params.id))
      return ok({})
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}
