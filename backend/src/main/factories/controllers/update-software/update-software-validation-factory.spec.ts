import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeUpdateSoftwareValidation } from './update-software-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('UpdateSoftwareValidationFactory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeUpdateSoftwareValidation()
    const validations: Validation[] = []
    const fields = ['ovenModel', 'iokPin']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
