export class UpdateConfigsError extends Error {
  constructor () {
    super('Unable to Update the Configs')
    this.name = 'UpdateConfigsError'
  }
}
