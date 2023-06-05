import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'

export const makeUpdateStepSpeedOvenBodyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['recipeId', 'menuId', 'equipTypeId', 'stepPosition', 'isActive', 'stepTemperature', 'tempIsPreheat', 'stepTime', 'hotAirSpeed', 'microwaves', 'internalResistance', 'stepInfo']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
