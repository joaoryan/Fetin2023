/* eslint-disable no-undef */
import { RequiredUpdateFieldValidaton } from '../../../../presentation/helpers/validators/required-update-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeUpdateRecipeCmaxValidation } from './Update-recipe-cmax-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddRecipeCmaxValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateRecipeCmaxValidation()
    const validations: Validation[] = []
    validations.push(new RequiredUpdateFieldValidaton())
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
