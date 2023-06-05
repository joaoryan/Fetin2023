import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols'

export class ValidTableFieldValidation implements Validation {
  private readonly tableFields: string[]

  constructor (tableField: string[]) {
    this.tableFields = tableField
  }

  validate (input: any): Error {
    const fieldName = Object.keys(input)[0]
    if (!this.tableFields.includes(fieldName)) {
      return new InvalidParamError(fieldName)
    }
  }
}
