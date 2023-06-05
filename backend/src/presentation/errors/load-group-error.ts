export class LoadGroupError extends Error {
  constructor () {
    super('There is no registered group')
    this.name = 'LoadGroupError'
  }
}
