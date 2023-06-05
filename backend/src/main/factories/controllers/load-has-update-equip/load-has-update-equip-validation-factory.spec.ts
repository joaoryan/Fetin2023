import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeLoadHasUpdateEquipValidation } from './load-has-update-equip-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('LoadHasUpdateEquipValidationnFactory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoadHasUpdateEquipValidation()
    const validations: Validation[] = []
    const fields = ['idEquip', 'iokPin']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
