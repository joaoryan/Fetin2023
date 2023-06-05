/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeAddStepCombiOvenTSIValidation } from './add-step-CombiOvenTSI-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddStepCombiOvenTSIValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddStepCombiOvenTSIValidation()
    const validations: Validation[] = []
    const fields = ['recipeId', 'menuId', 'equipTypeId', 'stepPosition', 'isActive', 'stepTemperature', 'steamPercentage', 'fanSpeed', 'steamInjection', 'endByTime', 'stepTime', 'stepInfo', 'probeTargetTemp']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
