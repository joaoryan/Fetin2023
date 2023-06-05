
import { DeleteCookbook } from '../../../domain/usecases/delete-cookbook'
import { MissingParamError, ServerError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class DeleteCookbookController implements Controller {
  private readonly paramsValidation: Validation
  private readonly dbDeleteCookbook: DeleteCookbook

  constructor (paramsValidation: Validation, dbDeleteCookbook: DeleteCookbook) {
    this.paramsValidation = paramsValidation
    this.dbDeleteCookbook = dbDeleteCookbook
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { cookbook } = httpRequest.body
      for (const deleteCookbook of cookbook) {
        const validationError = this.paramsValidation.validate(deleteCookbook)
        if (validationError) return badRequest(new MissingParamError('id'))
        const deleteIsOk = await this.dbDeleteCookbook.deleteCookbook(deleteCookbook.id, deleteCookbook.equipType)
        if (!deleteIsOk) return badRequest(new NoRowsAffected(deleteCookbook.id))
      }
      return ok({})
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
