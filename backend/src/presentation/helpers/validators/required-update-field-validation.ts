import { MissingParamError } from '../../errors'
import { Validation } from '../../protocols'

export class RequiredUpdateFieldValidaton implements Validation {
  validate (input: any): Error {
    const fields = Object.keys(input)
    for (const field of fields) {
      if (input[field] === undefined || input[field] === null) {
        return new MissingParamError(field)
      }
    }
  }
}
