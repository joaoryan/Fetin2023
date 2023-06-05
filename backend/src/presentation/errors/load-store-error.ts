export class LoadStoreError extends Error {
  constructor () {
    super('Store not found')
    this.name = 'LoadStoreError'
  }
}
