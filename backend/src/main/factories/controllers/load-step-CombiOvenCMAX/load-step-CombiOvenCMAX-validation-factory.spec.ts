import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeLoadStepsCombiOvenCMAXByRecipeIdValidation } from './load-step-CombiOvenCMAX-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('LoadStepsCombiOvenCMAXByRecipeIdValidationFactory', () => {
  test('should call StepCombiOvenCMAXValidationComposite with all validations', () => {
    makeLoadStepsCombiOvenCMAXByRecipeIdValidation()
    const validations: Validation[] = []
    const fields = ['recipeId', 'stepFrom']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
