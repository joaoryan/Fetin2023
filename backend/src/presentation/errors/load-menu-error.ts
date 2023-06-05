export class LoadUserMenurror extends Error {
  constructor () {
    super('There is no registered menu')
    this.name = 'LoadUserMenurror'
  }
}
