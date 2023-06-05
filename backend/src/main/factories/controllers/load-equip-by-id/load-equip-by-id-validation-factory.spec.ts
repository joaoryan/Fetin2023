import { describe, test, expect, jest } from '@jest/globals'
import { NumericFieldValidation } from '../../../../presentation/helpers/validators/numeric-fields-validation'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeLoadEquipByIdValidation } from './load-equip-by-id-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('LoadEquipByValidationFactory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoadEquipByIdValidation()
    const validations: Validation[] = []
    const fields = ['id']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
      validations.push(new NumericFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
