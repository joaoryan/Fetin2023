/* eslint-disable eol-last */
import { EditUserData } from '../../../domain/usecases/update-user-data'
import { EditUserDataError } from '../../errors/edit-user-data-error'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './update-user-data-controller-protocols'

export class EditUserDataController implements Controller {
  private readonly userDataValidation: Validation
  private readonly editUserData: EditUserData

  constructor (userDataValidation: Validation, editUserData: EditUserData) {
    this.userDataValidation = userDataValidation
    this.editUserData = editUserData
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.userDataValidation.validate(httpRequest.body.user)
      if (error) {
        return badRequest(error)
      }

      const userEdit = httpRequest.body.user
      const user = await this.editUserData.editUserData(userEdit)
      if (!user) {
        return forbidden(new EditUserDataError())
      }

      return ok({
        editedUserData: user
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
