/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeLoadUserByCompanyValidation } from './load-user-by-company-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('LoadUserByCompanyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadUserByCompanyValidation()
    const validations: Validation[] = []
    const fields = ['id']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
