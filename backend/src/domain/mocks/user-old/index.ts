/* eslint-disable no-undef */
import { getOne, insertOne } from '../../../infra/db/mysql/mysql-helper'
import { HttpRequest } from '../../../presentation/protocols'
import env from '../../../main/config/env'
import mysql from 'mysql'
import { UserOldModel } from '../../models/userOld'

afterAll(() => {
  testConnection.end()
})

const testConnection = mysql.createPool(env.previousDb)

// User old mock

export const mockUserOldModel = (): UserOldModel => (
  {
    realm: 'realm',
    username: 'username',
    nomeUsuario: 'nomeUsuario',
    email: 'user_email@mail.com',
    emailVerified: true,
    verificationToken: 'verificationToken',
    idiomaUsuario: 'idiomaUsuario',
    modelo: 'modelo',
    temperaturaUsuario: 'temperaturaUsuario',
    dataCadastro: 'dataCadastro',
    tipoUsuario: 'tipoUsuario',
    statusUsuario: 'statusUsuario'
  }
)

export const mockInsertUserOld = async (): Promise<{ idUser: any, email: string }> => {
  const user = await getOne(testConnection, 'User', 'email', 'user_email@mail.com')
  if (user) {
    return { idUser: user[0].id, email: 'user_email@mail.com' }
  } else {
    const userResult = await insertOne(testConnection, 'User', mockUserOldModel())
    return { idUser: userResult.insertId, email: 'user_email@mail.com' }
  }
}

export const mockReturnUserOld = (): UserOldModel => (Object.assign(mockUserOldModel(), { id: 1 }))

export const makeFakeRequestGetUserByEmail = async (): Promise<HttpRequest> => ({
  params: {
    email: 'user_email@mail.com'
  }
})
