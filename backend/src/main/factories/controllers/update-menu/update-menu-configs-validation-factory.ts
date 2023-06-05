import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'

export const makeUpdateMenuConfigsValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['id', 'menuId', 'preHeat1', 'preHeat2', 'preHeat2Enabled', 'stabilizationTime', 'dateFormat', 'timeFormat', 'manualModeEnabled', 'favoritesEnabled', 'repeatRecipeEnabled', 'heatBrownMoreEnabled', 'temperatureUnit', 'weightUnit', 'theme', 'introduction', 'combiOvenEnabled', 'multipleCookingEnabled', 'technicookRecipesEnabled', 'editGroupsEnabled', 'operatorModeEnabled']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
