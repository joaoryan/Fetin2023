/* eslint-disable eol-last */
import { RecipeCMAXModel } from '../../../domain/models/recipeCMAX'
import { AddRecipe, AddRecipeModel } from '../../../domain/usecases/add-recipe'
import { AddRecipeCMAX, AddRecipeCMAXModel } from '../../../domain/usecases/add-recipeCMAX'
import { RecipeParamsError } from '../../errors/recipe-params-error'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-recipe-controller-protocols'

export class AddRecipeController implements Controller {
  private readonly recipeValidation: Validation
  private readonly recipeCmaxValidation: Validation
  private readonly addRecipe: AddRecipe
  private readonly addRecipeCMAX: AddRecipeCMAX

  constructor (recipeValidation: Validation, recipeCmaxValidation: Validation, addRecipe: AddRecipe, addRecipeCMAX: AddRecipeCMAX) {
    this.recipeValidation = recipeValidation
    this.recipeCmaxValidation = recipeCmaxValidation
    this.addRecipe = addRecipe
    this.addRecipeCMAX = addRecipeCMAX
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.recipe) return badRequest(new RecipeParamsError())
      const recipeRequest: AddRecipeModel[] & AddRecipeCMAXModel[] = httpRequest.body.recipe
      const recipeArrayResult: AddRecipeModel[] & AddRecipeCMAXModel[] = []
      if (recipeRequest[0].equipTypeId !== 4) {
        for (const recipe of recipeRequest) {
          const error = this.recipeValidation.validate(recipe)
          if (error) {
            return badRequest(error)
          }
          recipeArrayResult.push(await this.addRecipe.addRecipe(recipe))
        }
        return created<AddRecipeModel[]>(recipeArrayResult)
      } else {
        for (const recipe of recipeRequest) {
          const error = this.recipeCmaxValidation.validate(recipe)
          if (error) {
            return badRequest(error)
          }
          recipeArrayResult.push(await this.addRecipeCMAX.addRecipeCMAX(recipe))
        }
        return created<RecipeCMAXModel[]>(recipeArrayResult)
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
