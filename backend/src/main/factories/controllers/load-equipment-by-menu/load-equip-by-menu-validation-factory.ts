import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../../presentation/protocols'

export const makeLoadEquipByMenuValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['idMenu']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
