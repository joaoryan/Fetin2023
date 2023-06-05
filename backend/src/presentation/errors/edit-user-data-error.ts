export class EditUserDataError extends Error {
  constructor () {
    super('Unable to edit the user data')
    this.name = 'EditUserDataError'
  }
}
