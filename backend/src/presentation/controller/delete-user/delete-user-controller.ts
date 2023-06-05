import { DeleteUser } from '../../../domain/usecases/delete-user'
import { MissingParamError, ServerError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class DeleteUserController implements Controller {
  private readonly paramsValidation: Validation
  private readonly dbDeleteUser: DeleteUser

  constructor (paramsValidation: Validation, dbDeleteUser: DeleteUser) {
    this.paramsValidation = paramsValidation
    this.dbDeleteUser = dbDeleteUser
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const validationError = this.paramsValidation.validate(httpRequest.params)
      if (validationError) return badRequest(new MissingParamError('id'))
      const deleteIsOk = await this.dbDeleteUser.deleteUser(id)
      if (!deleteIsOk) return badRequest(new NoRowsAffected(id))
      return ok({})
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
