import { MissingParamError } from '../../errors'
import { Validation } from '../../protocols'

export class RequiredFieldValidaton implements Validation {
  private readonly fieldName: string

  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (input[this.fieldName] === undefined || input[this.fieldName] === null) {
      return new MissingParamError(this.fieldName)
    }
  }
}
