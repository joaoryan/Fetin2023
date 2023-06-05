/* eslint-disable no-undef */
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeAddMenuConfigsValidation } from './add-menu-configs-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddMenuConfigsValidation()
    const validations: Validation[] = []
    const fields = ['preHeat1', 'preHeat2', 'preHeat2Enabled', 'stabilizationTime', 'dateFormat', 'timeFormat', 'manualModeEnabled', 'favoritesEnabled', 'repeatRecipeEnabled', 'heatBrownMoreEnabled', 'temperatureUnit', 'weightUnit', 'theme', 'introduction', 'combiOvenEnabled', 'multipleCookingEnabled', 'technicookRecipesEnabled', 'editGroupsEnabled', 'operatorModeEnabled']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
