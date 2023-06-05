/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeSignUpCompanyValidation } from './signup-company-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpCompanyValidation()
    const validations: Validation[] = []
    const fields = ['corporateName', 'companyType']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
