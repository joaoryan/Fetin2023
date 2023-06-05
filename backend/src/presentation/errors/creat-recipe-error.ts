export class CreatingRecipeError extends Error {
  constructor () {
    super('Error creating recipe')
    this.name = 'CreatingRecipeError'
  }
}
