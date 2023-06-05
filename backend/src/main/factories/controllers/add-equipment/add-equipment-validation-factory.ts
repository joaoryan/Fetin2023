import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'

export const makeAddEquipmentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['idEquipment', 'typeEquipment', 'dataUpdate', 'appUpdate', 'serialNumber', 'softwareVersion']
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}
