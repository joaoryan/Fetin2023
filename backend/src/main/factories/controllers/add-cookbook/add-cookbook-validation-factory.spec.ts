import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeAddCookbookBodyValidation } from './add-cookbook-body-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddCookbookValidation Factory', () => {
  describe('Body validation factory', () => {
    test('Should call ValidationComposite with all validations', () => {
      makeAddCookbookBodyValidation()
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
      expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
  })
})
