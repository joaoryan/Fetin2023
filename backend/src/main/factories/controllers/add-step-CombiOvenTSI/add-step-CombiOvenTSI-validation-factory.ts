import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'

export const makeAddStepCombiOvenTSIValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['recipeId', 'menuId', 'equipTypeId', 'stepPosition', 'isActive', 'stepTemperature', 'steamPercentage', 'fanSpeed', 'steamInjection', 'endByTime', 'stepTime', 'stepInfo', 'probeTargetTemp']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
