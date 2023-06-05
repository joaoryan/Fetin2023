import { badRequest, serverError, created } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'
import { AddCookbook } from '../../../domain/usecases/add-cookbook'
import { RecipeCookbookModel } from '../../../domain/models/recipe-cookbook'
import { CookbookCreationError } from '../../errors/cookbook-creation-error'

export class AddCookbookController implements Controller {
  private readonly validation: Validation
  private readonly addCookbook: AddCookbook

  constructor (validation: Validation, addCookbook: AddCookbook) {
    this.validation = validation
    this.addCookbook = addCookbook
  }

  async handle (httpRequest: HttpRequest<AddCookbook.Request>): Promise<HttpResponse<RecipeCookbookModel>> {
    try {
      if (!httpRequest.body.cookbook) return badRequest(new Error())
      const requestCookbook = httpRequest.body.cookbook
      const validationError = this.validation.validate(requestCookbook)
      if (validationError) return badRequest(validationError)
      const cookbook = await this.addCookbook.addCookbook(requestCookbook)
      return created<RecipeCookbookModel>(cookbook)
    } catch (error) {
      return serverError(new CookbookCreationError())
    }
  }
}
