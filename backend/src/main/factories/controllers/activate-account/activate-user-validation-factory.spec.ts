/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeActivateUserValidation } from './activate-user-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('ActivateUserValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeActivateUserValidation()
    const validations: Validation[] = []
    const fields = ['activateToken']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
