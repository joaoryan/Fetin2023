/* eslint-disable no-undef */
import { NumericFieldValidation } from '../../../../presentation/helpers/validators/numeric-fields-validation'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeUpdateStoreBodyValidation } from './update-store-body-validation-factory'
import { makeUpdateStoreParamsValidation } from './update-store-params-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddRecipeValidation Factory', () => {
  test('Should call BodyValidationComposite with all validations', () => {
    makeUpdateStoreBodyValidation()
    const validations: Validation[] = []
    const fields = ['companyId', 'storeName', 'cnpj', 'street', 'state', 'neighborhood', 'zipCode', 'streetNumber', 'city', 'latitude', 'longitude']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
  test('Should call ParamsValidationComposite with all validations', () => {
    makeUpdateStoreParamsValidation()
    const paramValidation: Validation[] = []
    const fields = ['id']
    for (const field of fields) {
      paramValidation.push(new RequiredFieldValidaton(field))
      paramValidation.push(new NumericFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(paramValidation)
  })
})
