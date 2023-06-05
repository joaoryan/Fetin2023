import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeLoadStepsCombiOvenCMAXByRecipeIdValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['recipeId', 'stepFrom']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
