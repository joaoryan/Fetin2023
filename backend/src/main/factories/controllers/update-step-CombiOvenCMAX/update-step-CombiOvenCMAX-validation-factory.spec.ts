/* eslint-disable no-undef */
import { NumericFieldValidation } from '../../../../presentation/helpers/validators/numeric-fields-validation'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeUpdateStepCombiOvenCMAXBodyValidation } from './update-step-CombiOvenCMAX-body-validation-factory'
import { makeUpdateStepCombiOvenCMAXParamsValidation } from './update-step-CombiOvenCMAX-params-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('UpdateStepCombiOvenCMAXValidation Factory', () => {
  test('Should call StepCombiOvenCMAXBodyValidationComposite with all validations', () => {
    makeUpdateStepCombiOvenCMAXBodyValidation()
    const validations: Validation[] = []
    const fields = ['recipeId', 'menuId', 'stepPosition', 'isActive', 'stepTemperature', 'ovenFunction', 'timeOrProbe', 'stepTime', 'probeTargetTemp', 'stepSteamLevel', 'steamInjection', 'dumperStatus']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
  test('Should call StepCombiOvenCMAXParamsValidationComposite with all validations', () => {
    makeUpdateStepCombiOvenCMAXParamsValidation()
    const paramValidation: Validation[] = []
    const fields = ['id']
    for (const field of fields) {
      paramValidation.push(new RequiredFieldValidaton(field))
      paramValidation.push(new NumericFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(paramValidation)
  })
})
