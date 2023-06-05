import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeLoadStepsSpeedOvenByRecipeIdValidation } from './load-steps-SpeedOven-by-recipe-id-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('LoadStepsSpeedOvenByRecipeIdValidationFactory', () => {
  test('should call StepSpeedOvenValidationComposite with all validations', () => {
    makeLoadStepsSpeedOvenByRecipeIdValidation()
    const validations: Validation[] = []
    const fields = ['recipeId', 'stepFrom']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
