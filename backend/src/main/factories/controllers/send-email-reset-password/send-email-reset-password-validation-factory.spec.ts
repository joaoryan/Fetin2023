/* eslint-disable no-undef */
import { EmailValidaton } from '../../../../presentation/helpers/validators/email-valdiation'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { EmailValidator } from '../../../../presentation/protocols/email-validator'
import { makeSendEmailResetPasswordValidation } from './send-email-reset-password-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SendEmailResetPasswordValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSendEmailResetPasswordValidation()
    const validations: Validation[] = []
    const fields = ['email']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    validations.push(new EmailValidaton(makeEmailValidator(), 'email'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
