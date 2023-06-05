export class SendEmailError extends Error {
  constructor () {
    super('Error when sending email')
    this.name = 'SendEmailError'
  }
}
