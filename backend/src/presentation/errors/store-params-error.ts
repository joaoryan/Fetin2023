export class StoreParamsError extends Error {
  constructor () {
    super('Error in store parameters')
    this.name = 'StoreParametersError'
  }
}
