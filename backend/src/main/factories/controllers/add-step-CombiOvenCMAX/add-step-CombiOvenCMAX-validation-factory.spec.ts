/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeAddStepCombiOvenCMAXValidation } from './add-step-CombiOvenCMAX-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddStepCombiOvenCMAXValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddStepCombiOvenCMAXValidation()
    const validations: Validation[] = []
    const fields = ['recipeId', 'menuId', 'stepPosition', 'isActive', 'stepTemperature', 'ovenFunction', 'timeOrProbe', 'stepTime', 'probeTargetTemp', 'stepSteamLevel', 'steamInjection', 'dumperStatus']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
