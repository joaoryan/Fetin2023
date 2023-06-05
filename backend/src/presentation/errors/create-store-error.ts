export class CreateStoreError extends Error {
  constructor () {
    super('Error creating store')
    this.name = 'CreateStoreError'
  }
}
