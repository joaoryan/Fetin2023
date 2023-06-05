export class UpdateStoreError extends Error {
  constructor () {
    super('Error updating store')
    this.name = 'UpdateStoreError'
  }
}
