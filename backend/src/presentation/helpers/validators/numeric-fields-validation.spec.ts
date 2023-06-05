import { NumericFieldValidation } from './numeric-fields-validation'
import { describe, test, expect } from '@jest/globals'
import { InvalidParamError } from '../../errors'

const makeSut = (): NumericFieldValidation => {
  return new NumericFieldValidation('field')
}

describe('RequiredField Validations', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_string' })
    expect(error).toEqual(new InvalidParamError('field'))
  })

  test('Should return never if validation succeeds ("1")', () => {
    const sut = makeSut()
    const error = sut.validate({ field: '1' })
    expect(error).toBeFalsy()
  })
  test('Should return never if validation succeeds ( 1 )', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 1 })
    expect(error).toBeFalsy()
  })
})
