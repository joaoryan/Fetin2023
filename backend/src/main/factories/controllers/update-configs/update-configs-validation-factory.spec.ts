/* eslint-disable no-undef */
import { RequiredUpdateFieldValidaton } from '../../../../presentation/helpers/validators/required-update-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeUpdateConfigsValidation } from './update-configs-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('ConfigsValidation Factory', () => {
  test('Should call ValidationComposite with all validations for configs', () => {
    makeUpdateConfigsValidation()
    const validations: Validation[] = []
    validations.push(new RequiredUpdateFieldValidaton())
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
