/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeDeleteCookbookValidation } from './delete-cookbook-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('LoadCookbookValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDeleteCookbookValidation()
    const validations: Validation[] = []
    const fields = ['id', 'equipType']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
