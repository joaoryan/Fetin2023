import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeLoadStepsCombiOvenTSIByRecipeIdValidation } from './load-step-CombiOvenTSI-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('LoadStepsCombiOvenTSIByRecipeIdValidationFactory', () => {
  test('should call StepCombiOvenTSIValidationComposite with all validations', () => {
    makeLoadStepsCombiOvenTSIByRecipeIdValidation()
    const validations: Validation[] = []
    const fields = ['recipeId', 'stepFrom']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
