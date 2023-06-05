/* eslint-disable no-undef */
import { NumericFieldValidation } from '../../../../presentation/helpers/validators/numeric-fields-validation'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeUpdateStepCombiOvenTSIBodyValidation } from './update-step-CombiOvenTSI-body-validation-factory'
import { makeUpdateStepCombiOvenTSIParamsValidation } from './update-step-CombiOvenTSI-params-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('UpdateStepCombiOvenTSIValidation Factory', () => {
  test('Should call StepCombiOvenTSIBodyValidationComposite with all validations', () => {
    makeUpdateStepCombiOvenTSIBodyValidation()
    const validations: Validation[] = []
    const fields = ['recipeId', 'menuId', 'equipTypeId', 'stepPosition', 'isActive', 'stepTemperature', 'steamPercentage', 'fanSpeed', 'steamInjection', 'endByTime', 'stepTime', 'stepInfo', 'probeTargetTemp']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
  test('Should call StepCombiOvenTSIParamsValidationComposite with all validations', () => {
    makeUpdateStepCombiOvenTSIParamsValidation()
    const paramValidation: Validation[] = []
    const fields = ['id']
    for (const field of fields) {
      paramValidation.push(new RequiredFieldValidaton(field))
      paramValidation.push(new NumericFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(paramValidation)
  })
})
