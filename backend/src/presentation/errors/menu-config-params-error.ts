export class MenuConfigParametersError extends Error {
  constructor () {
    super('Error in menu config parameters')
    this.name = 'MenuConfigParametersError'
  }
}
