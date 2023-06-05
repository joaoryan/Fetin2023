import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadRecipe, Validation } from './load-recipe-by-group-id-controller-protocols'

export class LoadRecipeController implements Controller {
  private readonly loadRecipeValidation: Validation
  private readonly loadRecipe: LoadRecipe

  constructor (loadRecipeValidation: Validation, loadRecipe: LoadRecipe) {
    this.loadRecipeValidation = loadRecipeValidation
    this.loadRecipe = loadRecipe
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.loadRecipeValidation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { id } = httpRequest.params
      const recipe = await this.loadRecipe.loadRecipe(id)
      if (!recipe) return noContent()
      return ok({
        recipes: recipe
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
