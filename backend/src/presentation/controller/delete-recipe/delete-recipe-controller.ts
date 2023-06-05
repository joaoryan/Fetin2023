/* eslint-disable eol-last */
import { DeleteRecipe } from '../../../domain/usecases/delete-recipe'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './delete-recipe-controller-protocols'

export class DeleteRecipeController implements Controller {
  private readonly recipeValidation: Validation
  private readonly deleteRecipe: DeleteRecipe

  constructor (recipeValidation: Validation, deleteRecipe: DeleteRecipe) {
    this.recipeValidation = recipeValidation
    this.deleteRecipe = deleteRecipe
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { idArray, equipType } = httpRequest.body
      for (const id of idArray) {
        const error = this.recipeValidation.validate({ id, equipType })
        if (error) return badRequest(new MissingParamError('id'))
        if (typeof (id) === 'undefined') return badRequest(new InvalidParamError('id'))
        await this.deleteRecipe.deleteRecipe(id, equipType)
      }
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
