/* eslint-disable no-undef */
import { UserMySqlRepository } from './user-mysql-repository'
import env from '../../../../main/config/env'
import { connection } from '../../../../main/config/app'
import mysql from 'mysql'
import { deleteAll, getOne } from '../mysql-helper'
import { mockInsertUser, mockUserModel } from '../../../../domain/mocks/user'

describe('Account Mysql Repository', () => {
  afterAll(async () => {
    connection.end()
    testConnection.end()
  })

  const testConnection = mysql.createPool(env.dbTest)
  const sut = new UserMySqlRepository(testConnection)

  test('Should return an user on add success', async () => {
    await deleteAll(testConnection, 'User')
    const user = await sut.add(mockUserModel(1))
    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.userName).toBe('user_name')
    expect(user.email).toBe('user_email@mail.com')
    expect(user.emailVerified).toBeTruthy()
    expect(user.companyId).toBe(1)
    expect(user.phone).toBe('user_phone')
    expect(user.password).toBe('hashed_password')
    expect(user.userTypeId).toBe('adm')
  })

  test('Should return an user on loadByEmail success', async () => {
    const user = await mockInsertUser()
    const loadedUser = await sut.loadByEmail('user_email@mail.com')
    expect(loadedUser).toBeTruthy()
    expect(loadedUser.id).toBeTruthy()
    expect(loadedUser.userName).toBe('user_name')
    expect(loadedUser.email).toBe('user_email@mail.com')
    expect(loadedUser.emailVerified).toBeTruthy()
    expect(loadedUser.companyId).toBe(user.idCompany)
    expect(loadedUser.phone).toBe('user_phone')
    expect(loadedUser.password).toBe('hashed_password')
    expect(loadedUser.userTypeId).toBe('adm')
  })

  test('Should return null if loadByEmail fails', async () => {
    const loadedAccount = await sut.loadByEmail('invalid_mail@email.com')
    expect(loadedAccount).toBeFalsy()
  })

  test('Should return an user on loadByCompany success', async () => {
    const userResult = await mockInsertUser()
    const loadedUser = await sut.loadByCompany(userResult.idCompany)
    expect(loadedUser).toBeTruthy()
    expect(loadedUser[0].id).toBe(userResult.idUser)
    expect(loadedUser[0].userName).toBe('user_name')
    expect(loadedUser[0].email).toBe('user_email@mail.com')
    expect(loadedUser[0].emailVerified).toBeTruthy()
    expect(loadedUser[0].companyId).toBe(userResult.idCompany)
    expect(loadedUser[0].phone).toBe('user_phone')
    expect(loadedUser[0].password).toBe('hashed_password')
    expect(loadedUser[0].userTypeId).toBe('adm')
  })

  test('Should return null if loadByCompany fails', async () => {
    const load = await sut.loadByCompany(0)
    expect(load).toStrictEqual([])
  })

  test('Should Update the user accessToken with UpdateAccessToken success', async () => {
    await mockInsertUser()
    const loadedUser = await getOne(testConnection, 'User', 'email', 'user_email@mail.com')
    await sut.updateAccessToken(loadedUser[0].id, 'user_accessToken')
    const UpdatedUser = await getOne(testConnection, 'User', 'email', 'user_email@mail.com')
    expect(UpdatedUser[0].accessToken).toBe('user_accessToken')
  })

  test('Should return an user on loadByToken success without role', async () => {
    const user = await mockInsertUser()
    const loadedUser = await sut.loadByToken('user_accessToken')
    expect(loadedUser).toBeTruthy()
    expect(loadedUser.id).toBeTruthy()
    expect(loadedUser.userName).toBe('user_name')
    expect(loadedUser.email).toBe('user_email@mail.com')
    expect(loadedUser.emailVerified).toBeTruthy()
    expect(loadedUser.companyId).toBe(user.idCompany)
    expect(loadedUser.phone).toBe('user_phone')
    expect(loadedUser.password).toBe('hashed_password')
    expect(loadedUser.userTypeId).toBe('adm')
  })

  test('Should return null on loadByToken with role different from userTypeId', async () => {
    await mockInsertUser()
    const loadedAccount = await sut.loadByToken('user_accessToken', 'invalid')
    expect(loadedAccount).toBeNull()
  })

  test('Should return an account on loadByToken success with role', async () => {
    const user = await mockInsertUser()
    const loadedUser = await sut.loadByToken('user_accessToken', 'adm')
    expect(loadedUser).toBeTruthy()
    expect(loadedUser.id).toBeTruthy()
    expect(loadedUser.userName).toBe('user_name')
    expect(loadedUser.email).toBe('user_email@mail.com')
    expect(loadedUser.emailVerified).toBeTruthy()
    expect(loadedUser.companyId).toBe(user.idCompany)
    expect(loadedUser.phone).toBe('user_phone')
    expect(loadedUser.password).toBe('hashed_password')
    expect(loadedUser.userTypeId).toBe('adm')
  })

  test('Should return an account on loadByActivation success with role', async () => {
    const user = await mockInsertUser()
    const loadedUser = await sut.loadByActivation('pinIOK')
    expect(loadedUser).toBeTruthy()
    expect(loadedUser.userName).toBe('user_name')
    expect(loadedUser.email).toBe('user_email@mail.com')
    expect(loadedUser.emailVerified).toBeTruthy()
    expect(loadedUser.companyId).toBe(user.idCompany)
    expect(loadedUser.phone).toBe('user_phone')
    expect(loadedUser.password).toBe('hashed_password')
    expect(loadedUser.userTypeId).toBe('adm')
  })

  test('Should Update the user emailVerified with success', async () => {
    await mockInsertUser()
    const loadedUser = await sut.loadByActivation('pinIOK')
    expect(loadedUser).toBeTruthy()
    await sut.updateActivateToken(loadedUser.id ? loadedUser.id : 0, true)
    const user = await getOne(testConnection, 'User', 'id', loadedUser.id)
    expect(user).toBeTruthy()
    expect(user[0].emailVerified).toBe(1)
  })

  test('Should return an user on loadById success', async () => {
    const user = await mockInsertUser()
    const loadedUser = await sut.loadById(user.idUser)
    expect(loadedUser).toBeTruthy()
    expect(loadedUser.userName).toBe('user_name')
    expect(loadedUser.email).toBe('user_email@mail.com')
    expect(loadedUser.emailVerified).toBeTruthy()
    expect(loadedUser.companyId).toBe(user.idCompany)
    expect(loadedUser.phone).toBe('user_phone')
    expect(loadedUser.password).toBe('hashed_password')
    expect(loadedUser.userTypeId).toBe('adm')
  })

  test('Should return an user on loadUserOldByEmail fails', async () => {
    const loadedUser = await sut.loadUserOldByEmail('invalid_mail@email.com')
    expect(loadedUser).toBeFalsy()
  })

  test('Should return null if loadByEmail fails', async () => {
    const loadedAccount = await sut.loadByEmail('invalid_mail@email.com')
    expect(loadedAccount).toBeFalsy()
  })

  describe('DeleteUser method tests', () => {
    test('should delete a user successfully', async () => {
      const user = await mockInsertUser()
      const result = await sut.deleteUser(user.idUser)
      expect(result).toBeTruthy()
    })
    test('should return false if no rows are affected', async () => {
      const result = await sut.deleteUser(1234)
      expect(result).toBeFalsy()
    })
  })

  test('Should return an user on loadUserByCorporateName fails', async () => {
    await mockInsertUser()
    const loadedUser = await sut.loadUserByCorporateName('valid_name')
    expect(loadedUser).toBeTruthy()
  })

  test('Should return an user on loadUserByCorporateName fails', async () => {
    const loadedUser = await sut.loadUserByCorporateName('invalid_name')
    expect(loadedUser).toBeFalsy()
  })
})
