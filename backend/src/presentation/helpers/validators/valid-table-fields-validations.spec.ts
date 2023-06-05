import { describe, test, expect } from '@jest/globals'
import { ValidTableFieldValidation } from './valid-table-fields-validations'
import { InvalidParamError } from './../../errors/invalid-param-error'

const makeSut = (): ValidTableFieldValidation => {
  const columns = ['name', 'categoryId', 'equipTypeId', 'storeId', 'swVersion', 'sentMenuId', 'companyId']
  return new ValidTableFieldValidation(columns)
}

describe('ValidTableFieldValidation tests', () => {
  test('should return InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const input = { invalid_field: 'any_value' }
    const error = sut.validate(input)
    expect(error).toEqual(new InvalidParamError(Object.keys(input)[0]))
  })
  test('should return null if validation succeeds', () => {
    const sut = makeSut()
    const input = { storeId: '1' }
    const error = sut.validate(input)
    expect(error).toBeUndefined()
  })
})
