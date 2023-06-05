import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { RequiredUpdateFieldValidaton } from '../../../../presentation/helpers/validators/required-update-field-validation'

export const makeUpdateConfigsValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredUpdateFieldValidaton())
  return new ValidationComposite(validations)
}
