import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'

export const makeUpdateMenuValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['id', 'menuName', 'equipTypeId', 'companyId', 'creationDate', 'lastUpdate', 'menuVersion', 'deletionDate', 'userId', 'deletedBy', 'language']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
