import { AddEquipment } from '../../../domain/usecases/add-equipment'
import { badRequest, serverError, created, forbidden } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'
import { EquipmentCreationError } from '../../errors/equipment-creation-error'
import { LoadEquipByPinError } from '../../errors/load-pin-error'
import { formatEquipOven } from '../../../utils/formatEquipOven'

export class AddEquipmentController implements Controller {
  private readonly validation: Validation
  private readonly addEquipment: AddEquipment

  constructor (validation: Validation, addEquipment: AddEquipment) {
    this.validation = validation
    this.addEquipment = addEquipment
  }

  async handle (httpRequest: HttpRequest<AddEquipment.Request>): Promise<HttpResponse<AddEquipment.Response>> {
    try {
      const { pin } = httpRequest.params
      if (pin !== 'DE@Prat1c@BR2021') return forbidden(new LoadEquipByPinError())
      if (!httpRequest.body) return badRequest(new Error())
      const requestEquipment = httpRequest.body
      const validationError = this.validation.validate(requestEquipment)
      if (validationError) return badRequest(validationError)
      const equipment = await this.addEquipment.add(requestEquipment)
      return created<AddEquipment.Response>(formatEquipOven(equipment))
    } catch (error) {
      return serverError(new EquipmentCreationError())
    }
  }
}
