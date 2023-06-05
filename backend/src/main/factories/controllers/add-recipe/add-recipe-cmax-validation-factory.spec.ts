/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeAddRecipeCmaxValidation } from './add-recipe-cmax-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddRecipeCmaxValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddRecipeCmaxValidation()
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
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
