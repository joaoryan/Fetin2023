/* eslint-disable no-undef */
import { MissingParamError } from '../../errors'
import { RequiredUpdateFieldValidaton } from './required-update-field-validation'

const makeSut = (): RequiredUpdateFieldValidaton => {
  return new RequiredUpdateFieldValidaton()
}

describe('RequiredField Validations', () => {
  test('Should return MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: null })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
