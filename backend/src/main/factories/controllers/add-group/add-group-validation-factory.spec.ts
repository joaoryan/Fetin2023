/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeAddGroupValidation } from './add-group-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddGroupValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddGroupValidation()
    const validations: Validation[] = []
    const fields = ['menuId', 'groupName', 'groupPosition', 'groupImage', 'preHeat', 'creationDate', 'lastUpdate']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
