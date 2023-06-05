export class UpdateGroupError extends Error {
  constructor () {
    super('Unable to Update the group')
    this.name = 'UpdateGroupError'
  }
}
