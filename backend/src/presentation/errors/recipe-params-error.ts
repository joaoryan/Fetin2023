export class RecipeParamsError extends Error {
  constructor () {
    super('Error in recipe parameters')
    this.name = 'RecipeParametersError'
  }
}
