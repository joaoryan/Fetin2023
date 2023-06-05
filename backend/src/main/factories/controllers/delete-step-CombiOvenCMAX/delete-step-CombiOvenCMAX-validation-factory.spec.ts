/* eslint-disable no-undef */
import { NumericFieldValidation } from '../../../../presentation/helpers/validators/numeric-fields-validation'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeDeleteStepCombiOvenCMAXValidation } from './delete-step-CombiOvenCMAX-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('DeleteStepCombiOvenCMAXValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDeleteStepCombiOvenCMAXValidation()
    const validations: Validation[] = []
    const fields = ['id']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
      validations.push(new NumericFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
