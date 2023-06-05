/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeAddStepSpeedOvenValidation } from './add-step-SpeedOven-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddStepSpeedOvenValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddStepSpeedOvenValidation()
    const validations: Validation[] = []
    const fields = ['recipeId', 'menuId', 'equipTypeId', 'stepPosition', 'isActive', 'stepTemperature', 'tempIsPreheat', 'stepTime', 'hotAirSpeed', 'microwaves', 'internalResistance', 'stepInfo']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
