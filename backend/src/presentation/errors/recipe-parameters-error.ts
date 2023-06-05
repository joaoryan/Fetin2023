export class RecipeParametersError extends Error {
  constructor () {
    super('Error in recipe parameters')
    this.name = 'RecipeParametersError'
  }
}
