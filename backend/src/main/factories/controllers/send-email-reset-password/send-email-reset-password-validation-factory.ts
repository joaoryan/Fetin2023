import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../../presentation/protocols'
import { EmailValidaton } from '../../../../presentation/helpers/validators/email-valdiation'
import { EmailValidatorAdapter } from '../../../../utils/email-validator-adapter'

export const makeSendEmailResetPasswordValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['email']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  validations.push(new EmailValidaton(new EmailValidatorAdapter(), 'email'))
  return new ValidationComposite(validations)
}
