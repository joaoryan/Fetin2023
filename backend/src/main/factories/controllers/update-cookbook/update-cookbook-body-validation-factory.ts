import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'

export const makeUpdateCookbookBodyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = [
    'equipTypeId',
    'recipeName',
    'recipeImage',
    'creationDate',
    'createdBy',
    'lastUpdate',
    'updatedBy',
    'ingredientType',
    'dishType',
    'ingredients',
    'instructions',
    'weight',
    'entryTemp',
    'companyId',
    'menuId',
    'language',
    'origin',
    'preHeatTemp'
  ]
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
