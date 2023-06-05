/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeDeleteRecipeValidation } from './delete-recipe-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('DeleteRecipeValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDeleteRecipeValidation()
    const validations: Validation[] = []
    const fields = ['id', 'equipType']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
