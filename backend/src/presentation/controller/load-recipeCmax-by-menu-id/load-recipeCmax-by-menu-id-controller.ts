import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadRecipeCMAX, Validation } from './load-recipeCmax-by-menu-id-controller-protocols'

export class LoadRecipeCmaxController implements Controller {
  private readonly loadRecipeValidation: Validation
  private readonly loadRecipeCMAX: LoadRecipeCMAX

  constructor (loadRecipeValidation: Validation, loadRecipeCMAX: LoadRecipeCMAX) {
    this.loadRecipeValidation = loadRecipeValidation
    this.loadRecipeCMAX = loadRecipeCMAX
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.loadRecipeValidation.validate(httpRequest.params)
      if (error) return badRequest(error)
      const { id } = httpRequest.params
      const recipeCMAX = await this.loadRecipeCMAX.loadRecipeCMAX(id)
      if (!recipeCMAX) return noContent()
      return ok({
        recipes: recipeCMAX
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
