import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'

export const makeUpdateGroupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['id', 'menuId', 'groupName', 'groupPosition', 'groupImage', 'preHeat', 'creationDate', 'lastUpdate']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
