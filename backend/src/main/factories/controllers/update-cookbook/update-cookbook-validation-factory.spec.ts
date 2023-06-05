import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeUpdateCookbookBodyValidation } from './update-cookbook-body-validation-factory'
import { makeUpdateCookbookParamsValidation } from './update-cookbook-params-validation-factory'
import { NumericFieldValidation } from '../../../../presentation/helpers/validators/numeric-fields-validation'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('UpdateCookbookValidation Factory', () => {
  describe('Params validation factory', () => {
    test('Should call ValidationComposite with all validations', () => {
      makeUpdateCookbookParamsValidation()
      const validations: Validation[] = []
      const fields = ['id']
      for (const field of fields) {
        validations.push(new RequiredFieldValidaton(field))
        validations.push(new NumericFieldValidation(field))
      }
      expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
  })
  describe('Body validation factory', () => {
    test('Should call ValidationComposite with all validations', () => {
      makeUpdateCookbookBodyValidation()
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
      const validations: Validation[] = []
      for (const field of fields) {
        validations.push(new RequiredFieldValidaton(field))
      }
      expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
  })
})
