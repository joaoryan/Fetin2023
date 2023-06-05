import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeLoadStoresByCompanyIdValidation } from './load-stores-by-company-id-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('LoadEquipByCompanyValidationFactory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoadStoresByCompanyIdValidation()
    const validations: Validation[] = []
    const fields = ['companyId', 'userId', 'userPrivilegeUser']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
