import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../../presentation/protocols'
import { NumericFieldValidation } from '../../../../presentation/helpers/validators/numeric-fields-validation'

export const makeLoadRecipeValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['id']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
    validations.push(new NumericFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
