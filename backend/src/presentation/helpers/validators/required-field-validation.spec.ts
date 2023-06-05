/* eslint-disable no-undef */
import { MissingParamError } from '../../errors'
import { RequiredFieldValidaton } from './required-field-validation'

const makeSut = (): RequiredFieldValidaton => {
  return new RequiredFieldValidaton('field')
}

describe('RequiredField Validations', () => {
  test('Should return MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
