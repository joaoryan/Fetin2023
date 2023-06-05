export class GroupParamsError extends Error {
  constructor () {
    super('Error in group parameters')
    this.name = 'GroupParametersError'
  }
}
