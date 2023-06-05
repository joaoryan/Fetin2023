import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'

export const makeAddRecipeCmaxValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = [
    'equipTypeId',
    'menuId',
    'recipeName',
    'recipePosition',
    'creationDate',
    'createdBy',
    'lastUpdate',
    'updatedBy',
    'preheatOn',
    'preheatTemp',
    'preheatFunction',
    'preheatSteamLevel',
    'weight',
    'entryTemp',
    'ingredientType',
    'dishType',
    'ingredients',
    'instructions',
    'origin'
  ]
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
