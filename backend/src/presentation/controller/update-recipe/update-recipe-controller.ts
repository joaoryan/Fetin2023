/* eslint-disable eol-last */
import { UpdateRecipe } from '../../../domain/usecases/Update-recipe'
import { UpdateRecipeCMAX } from '../../../domain/usecases/Update-recipeCMAX'
import { UpdateRecipeError } from '../../errors/Update-recipe-error'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './Update-recipe-controller-protocols'
import { MissingParamError } from '../../errors'

export class UpdateRecipeController implements Controller {
  private readonly recipeValidation: Validation
  private readonly recipeCmaxValidation: Validation
  private readonly updateRecipe: UpdateRecipe
  private readonly updateRecipeCMAX: UpdateRecipeCMAX

  constructor (recipeValidation: Validation, recipeCmaxValidation: Validation, updateRecipe: UpdateRecipe, updateRecipeCMAX: UpdateRecipeCMAX) {
    this.recipeValidation = recipeValidation
    this.recipeCmaxValidation = recipeCmaxValidation
    this.updateRecipe = updateRecipe
    this.updateRecipeCMAX = updateRecipeCMAX
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.recipe) return badRequest(new MissingParamError('recipe'))
      const recipe = httpRequest.body.recipe
      if (recipe.equipTypeId !== 4) {
        const error = this.recipeValidation.validate(httpRequest.body.recipe)
        if (error) return badRequest(error)
        const recipeResult = await this.updateRecipe.updateRecipe(recipe)
        if (!recipeResult) return forbidden(new UpdateRecipeError())
        return ok({})
      } else {
        const error = this.recipeCmaxValidation.validate(httpRequest.body.recipe)
        if (error) return badRequest(error)
        const recipeCmax = await this.updateRecipeCMAX.updateRecipeCMAX(recipe)
        if (!recipeCmax) return forbidden(new UpdateRecipeError())
        return ok({})
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
