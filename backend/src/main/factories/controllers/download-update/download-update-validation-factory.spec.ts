import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeDownloadUpdateValidation } from './download-update-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('DownloadUpdateValidationFactory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeDownloadUpdateValidation()
    const validations: Validation[] = []
    const fields = ['ovenModel']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
