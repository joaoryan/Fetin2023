import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'

export const makeAddStoreValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['companyId', 'storeName', 'cnpj', 'street', 'state', 'neighborhood', 'zipCode', 'streetNumber', 'city', 'latitude', 'longitude']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
