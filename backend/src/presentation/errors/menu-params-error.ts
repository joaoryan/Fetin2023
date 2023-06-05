export class MenuParamsError extends Error {
  constructor () {
    super('Error in menu parameters')
    this.name = 'MenuParametersError'
  }
}
