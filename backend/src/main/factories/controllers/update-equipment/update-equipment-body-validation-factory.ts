import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredUpdateFieldValidaton } from '../../../../presentation/helpers/validators/required-update-field-validation'

export const makeUpdateEquipmentBodyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredUpdateFieldValidaton())
  return new ValidationComposite(validations)
}
