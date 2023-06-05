/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeAddStoreValidation } from './add-store-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddStoreValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddStoreValidation()
    const validations: Validation[] = []
    const fields = ['companyId', 'storeName', 'cnpj', 'street', 'state', 'neighborhood', 'zipCode', 'streetNumber', 'city', 'latitude', 'longitude']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
