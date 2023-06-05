/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeLoadEquipByMenuValidation } from './load-equip-by-menu-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('LoadEquipByMenuValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadEquipByMenuValidation()
    const validations: Validation[] = []
    const fields = ['idMenu']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
