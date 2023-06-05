import { ok, serverError, badRequest } from '../../helpers/http-helper'
import { UpdateCookbook } from '../../../domain/usecases/update-cookbook'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

import { MissingParamError, ServerError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'

export class UpdateCookbookController implements Controller {
  private readonly paramsValidation: Validation
  private readonly bodyValidation: Validation
  private readonly dbUpdateCookbook: UpdateCookbook
  constructor (paramsValidation: Validation, bodyValidation: Validation, dbUpdateCookbook: UpdateCookbook) {
    this.paramsValidation = paramsValidation
    this.bodyValidation = bodyValidation
    this.dbUpdateCookbook = dbUpdateCookbook
  }

  async handle (httpRequest: HttpRequest<UpdateCookbook.Request>): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.cookbook) return badRequest(new MissingParamError('equipment'))
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const validationParamsError = this.paramsValidation.validate(httpRequest.params)
      const validationBodyError = this.bodyValidation.validate(httpRequest.body.cookbook)
      if (validationParamsError) return badRequest(validationParamsError)
      if (validationBodyError) return badRequest(validationBodyError)
      const result = await this.dbUpdateCookbook.update(httpRequest.params.id, httpRequest.body.cookbook)
      if (!result) return badRequest(new NoRowsAffected(httpRequest.params.id))
      return ok({})
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}
