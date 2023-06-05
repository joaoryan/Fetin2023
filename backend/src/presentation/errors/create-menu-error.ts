export class CreateMenuError extends Error {
  constructor () {
    super('Error creating menu')
    this.name = 'CreateMenuError'
  }
}
