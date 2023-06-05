import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { ValidTableFieldValidation } from '../../../../presentation/helpers/validators/valid-table-fields-validations'

export const makeCountEquipmentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const columns = ['name', 'categoryId', 'equipTypeId', 'storeId', 'swVersion', 'sentMenuId', 'companyId']

  validations.push(new ValidTableFieldValidation(columns))

  return new ValidationComposite(validations)
}
