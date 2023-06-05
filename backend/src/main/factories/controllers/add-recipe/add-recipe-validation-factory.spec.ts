/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeAddRecipeValidation } from './add-recipe-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddRecipeValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddRecipeValidation()
    const validations: Validation[] = []
    const fields = ['equipTypeId', 'groupId', 'menuId', 'recipeName', 'recipePosition', 'recipeImage', 'creationDate', 'createdBy', 'lastUpdate', 'updatedBy', 'isFavorite', 'heatMore', 'brownMore', 'heatBrownMore', 'ingredientType', 'dishType', 'ingredients', 'instructions', 'weight', 'entryTemp', 'preHeatTemp', 'origin']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
