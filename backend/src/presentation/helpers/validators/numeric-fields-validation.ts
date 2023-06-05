import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols'

export class NumericFieldValidation implements Validation {
  private readonly fieldName: string

  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (isNaN(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
