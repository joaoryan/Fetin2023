export class CompanyExistsError extends Error {
  constructor () {
    super('This company has already been registered')
    this.name = 'CompanyExistsError'
  }
}
