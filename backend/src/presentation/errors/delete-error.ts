export class ErrorToDelete extends Error {
  constructor () {
    super('Error to delete')
    this.name = 'ErrorToDelete'
  }
}
