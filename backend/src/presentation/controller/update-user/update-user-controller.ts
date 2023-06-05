/* eslint-disable eol-last */
import { EditUserBelongStoreData } from '../../../domain/usecases/update-user-belong-store-data'
import { EditUserData } from '../../../domain/usecases/update-user-data'
import { EditUserDataError } from '../../errors/edit-user-data-error'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class EditUserController implements Controller {
  private readonly userDataValidation: Validation
  private readonly editUserData: EditUserData
  private readonly editUserBelongStoreData: EditUserBelongStoreData

  constructor (userDataValidation: Validation, editUserData: EditUserData, editUserBelongStoreData: EditUserBelongStoreData) {
    this.userDataValidation = userDataValidation
    this.editUserData = editUserData
    this.editUserBelongStoreData = editUserBelongStoreData
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
      const storeId = httpRequest.body.storeId
      if (storeId) {
        await this.editUserBelongStoreData.editUserBelongStoreData(userEdit.id, storeId)
      }
      return ok({
        editedUserData: user
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
