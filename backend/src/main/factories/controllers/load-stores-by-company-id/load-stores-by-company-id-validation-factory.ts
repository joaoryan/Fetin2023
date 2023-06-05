import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeLoadStoresByCompanyIdValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['companyId', 'userId', 'userPrivilegeUser']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
