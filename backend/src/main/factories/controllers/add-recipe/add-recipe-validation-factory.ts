import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'

export const makeAddRecipeValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['equipTypeId', 'groupId', 'menuId', 'recipeName', 'recipePosition', 'recipeImage', 'creationDate', 'createdBy', 'lastUpdate', 'updatedBy', 'isFavorite', 'heatMore', 'brownMore', 'heatBrownMore', 'ingredientType', 'dishType', 'ingredients', 'instructions', 'weight', 'entryTemp', 'preHeatTemp', 'origin']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
