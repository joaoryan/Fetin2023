import { describe, test, expect, jest } from '@jest/globals'
import { ValidTableFieldValidation } from '../../../../presentation/helpers/validators/valid-table-fields-validations'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeCountEquipmentValidation } from './count-equipment-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('CountEquipmentValidationFactory tests', () => {
  test('should call ValidationComposite with all validations', () => {
    makeCountEquipmentValidation()
    const validations: Validation[] = []
    const columns = ['name', 'categoryId', 'equipTypeId', 'storeId', 'swVersion', 'sentMenuId', 'companyId']
    validations.push(new ValidTableFieldValidation(columns))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
