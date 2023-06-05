/* eslint-disable no-undef */
import { RequiredUpdateFieldValidaton } from '../../../../presentation/helpers/validators/required-update-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeUpdateRecipeValidation } from './Update-recipe-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddRecipeValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateRecipeValidation()
    const validations: Validation[] = []
    validations.push(new RequiredUpdateFieldValidaton())
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
