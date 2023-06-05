export class UpdateRecipeError extends Error {
  constructor () {
    super('Error Updateing recipe')
    this.name = 'UpdateRecipeError'
  }
}
