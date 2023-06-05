export class CreateGroupError extends Error {
  constructor () {
    super('Error creating group')
    this.name = 'CreateGroupError'
  }
}
