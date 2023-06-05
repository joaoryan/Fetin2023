import { UpdateSoftware } from '../../../domain/usecases/update-software'
import { ServerError } from '../../errors'
import { LoadEquipByPinError } from '../../errors/load-pin-error'
import { badRequest, download, forbidden, noContent, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'
import { LoadEquipByPin } from '../add-user/add-user-controller-protocols'

export class UpdateSoftwareController implements Controller {
  private readonly updateSoftware: UpdateSoftware
  private readonly validation: Validation
  private readonly loadEquipByPin: LoadEquipByPin
  constructor (updateSoftware: UpdateSoftware, validation: Validation, loadEquipByPin: LoadEquipByPin) {
    this.updateSoftware = updateSoftware
    this.validation = validation
    this.loadEquipByPin = loadEquipByPin
  }

  async handle (httpRequest: HttpRequest<UpdateSoftware.Request>): Promise<HttpResponse<UpdateSoftware.Response>> {
    try {
      const validationError = this.validation.validate(httpRequest.params)
      if (validationError) return badRequest(validationError)
      const equip = await this.loadEquipByPin.load(httpRequest.params.iokPin)
      if (!equip) {
        return forbidden(new LoadEquipByPinError())
      }
      const response = await this.updateSoftware.load(httpRequest.params.ovenModel, httpRequest.params.iokPin)
      if (!response) return noContent()
      return download(response)
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
