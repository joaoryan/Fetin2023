export class CookbookCreationError extends Error {
  constructor () {
    super('Cookbook creation error.')
    this.name = 'CookbookCreationError'
  }
}
