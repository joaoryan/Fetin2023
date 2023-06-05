import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeAddEquipmentValidation } from './add-equipment-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddEquipmentValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddEquipmentValidation()
    const validations: Validation[] = []
    const fields = ['idEquipment', 'typeEquipment', 'dataUpdate', 'appUpdate', 'serialNumber', 'softwareVersion']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
