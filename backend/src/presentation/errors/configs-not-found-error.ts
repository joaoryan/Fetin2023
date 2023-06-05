export class ConfigsNotFoundError extends Error {
  constructor () {
    super('User configurations not found')
    this.name = 'ConfigsNotFoundError'
  }
}
