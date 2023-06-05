/* eslint-disable no-undef */
import { NumericFieldValidation } from '../../../../presentation/helpers/validators/numeric-fields-validation'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeDeleteStepSpeedOvenValidation } from './delete-step-SpeedOven-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('DeleteStepSpeedOvenValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDeleteStepSpeedOvenValidation()
    const validations: Validation[] = []
    const fields = ['id']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
      validations.push(new NumericFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
