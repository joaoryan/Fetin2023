import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadRecipeCookbook, Validation } from './load-recipe-cookbook-controller-protocols'

export class LoadRecipeCookbookController implements Controller {
  private readonly loadRecipeValidation: Validation
  private readonly loadRecipeCookbook: LoadRecipeCookbook

  constructor (loadRecipeValidation: Validation, loadRecipeCookbook: LoadRecipeCookbook) {
    this.loadRecipeValidation = loadRecipeValidation
    this.loadRecipeCookbook = loadRecipeCookbook
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.loadRecipeValidation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { id } = httpRequest.params
      const response = await this.loadRecipeCookbook.loadRecipeCookbook(id)
      if (!response) return noContent()
      return ok({
        recipes: response
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
