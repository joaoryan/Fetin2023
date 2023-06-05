export class LoadRecipeError extends Error {
  constructor () {
    super('There is no registered recipe')
    this.name = 'LoadRecipeError'
  }
}
