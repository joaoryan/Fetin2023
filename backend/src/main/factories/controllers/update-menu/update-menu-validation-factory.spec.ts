/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeUpdateMenuValidation } from './Update-menu-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('UpdateMenuValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateMenuValidation()
    const validations: Validation[] = []
    const fields = ['id', 'menuName', 'equipTypeId', 'companyId', 'creationDate', 'lastUpdate', 'menuVersion', 'deletionDate', 'userId', 'deletedBy', 'language']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
