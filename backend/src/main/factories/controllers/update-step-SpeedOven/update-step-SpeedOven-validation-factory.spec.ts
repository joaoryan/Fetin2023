/* eslint-disable no-undef */
import { NumericFieldValidation } from '../../../../presentation/helpers/validators/numeric-fields-validation'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeUpdateStepSpeedOvenBodyValidation } from './update-step-SpeedOven-body-validation-factory'
import { makeUpdateStepSpeedOvenParamsValidation } from './update-step-SpeedOven-params-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('UpdateStepSpeedOvenValidation Factory', () => {
  test('Should call StepSpeedOvenBodyValidationComposite with all validations', () => {
    makeUpdateStepSpeedOvenBodyValidation()
    const validations: Validation[] = []
    const fields = ['recipeId', 'menuId', 'equipTypeId', 'stepPosition', 'isActive', 'stepTemperature', 'tempIsPreheat', 'stepTime', 'hotAirSpeed', 'microwaves', 'internalResistance', 'stepInfo']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
  test('Should call StepSpeedOvenParamsValidationComposite with all validations', () => {
    makeUpdateStepSpeedOvenParamsValidation()
    const paramValidation: Validation[] = []
    const fields = ['id']
    for (const field of fields) {
      paramValidation.push(new RequiredFieldValidaton(field))
      paramValidation.push(new NumericFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(paramValidation)
  })
})
