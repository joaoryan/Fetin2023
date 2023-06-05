/* eslint-disable no-undef */
import { deleteAll, insertOne, updateById } from '../../../infra/db/mysql/mysql-helper'
import { HttpRequest } from '../../../presentation/protocols'
import env from '../../../main/config/env'
import mysql from 'mysql'
import { sign } from 'jsonwebtoken'
import { UserModel, UserUpdateModel } from '../../models/user'
import { ConfigsModel } from '../../models/configs'
import { UpdateConfigsModel } from '../../usecases/update-configs'
import { CompanyModel } from '../../models/company'

afterAll(() => {
  testConnection.end()
})

const testConnection = mysql.createPool(env.dbTest)

// User mock

export const mockUserModel = (companyId: number): UserModel => (
  {
    userName: 'user_name',
    email: 'user_email@mail.com',
    emailVerified: true,
    companyId: companyId,
    phone: 'user_phone',
    password: 'hashed_password',
    userTypeId: 'adm',
    creationDate: '1111-11-11',
    accessToken: 'user_accessToken',
    activateToken: 'pinIOK'
  }
)

export const mockInsertUser = async (): Promise<{ idUser: number, idCompany: number }> => {
  const company = await mockInsertCompany()
  await deleteAll(testConnection, 'User')
  const userResult = await insertOne(testConnection, 'User', mockUserModel(company.idCompany))
  return { idUser: userResult.insertId, idCompany: company.idCompany }
}

export const mockAddUser = async (): Promise<UserModel> => {
  const company = await mockInsertCompany()
  const userResult = mockUserModel(company.idCompany)
  return userResult
}

export const mockUpdateUser = async (): Promise<UserUpdateModel> => {
  const user = await mockInsertUser()
  const userResult = Object.assign(mockUserModel(user.idCompany), { id: user.idUser })
  return userResult
}

export const mockReturnUser = (): UserModel => (Object.assign(mockUserModel(1), { id: 1 }))

export const mockReturnUserStore = (): UserModel => (
  Object.assign(mockUserModel(1), { id: 1 }, { stores: [{ label: 'storeName', value: 1 }] })
)

export const makeFakeRequestGetUserByCorporateName = async (): Promise<HttpRequest> => ({
  params: {
    corporateName: 'valid_name'
  }
})

export const mockAddUserRequest = async (): Promise<HttpRequest> => {
  const user = await mockAddUser()
  const httpRequest = {
    body: {
      user: user
    }
  }
  return httpRequest
}

export const mockActivateTokenRequest = (): HttpRequest => ({
  body: {
    activateToken: 'activateToken'
  }
})

export const mockUpdateUserRequest = async (): Promise<HttpRequest> => {
  const user = await mockUpdateUser()
  const httpRequest = {
    body: {
      user: user
    },
    params: {
      id: user.id
    }
  }
  return httpRequest
}

export const mockLoadUserRequest = async (): Promise<HttpRequest> => {
  const user = await mockInsertUser()
  const httpRequest = {
    params: {
      id: user.idUser
    }
  }
  return httpRequest
}

export const mockDeleteUserRequest = async (): Promise<HttpRequest> => {
  const user = await mockInsertUser()
  const httpRequest = {
    params: {
      id: user.idUser
    }
  }
  return httpRequest
}

export const makeFakeRequestLog = (): HttpRequest => ({
  body: {
    name: 'user_name',
    email: 'user_email@mail.com',
    password: 'hashed_password',
    passwordConfirmation: 'hashed_password'
  }
})

export const mockAccessToken = async (idUser?: number): Promise<string> => {
  let id
  if (!idUser) {
    await deleteAll(testConnection, 'User')
    const result = await insertOne(testConnection, 'User', {
      id: 1,
      userName: 'valid_name',
      email: 'valid@mail.com',
      emailVerified: true,
      companyId: 1,
      phone: 'valid_phone',
      password: 'valid_password',
      creationDate: '2022-04-13',
      userTypeId: 'admin'
    })
    id = result.insertId
  } else {
    id = idUser
  }
  const accessToken = sign({ id }, env.jwtSecret)
  await updateById(testConnection, 'User', 'accessToken', id, accessToken)
  return accessToken
}

export const makeFakeRequestUserAdm = async (): Promise<HttpRequest> => ({
  body: {
    user: {
      userName: 'valid_name',
      email: 'valid_email@mail.com',
      phone: 'valid_phone',
      creationDate: '2022-04-13',
      password: 'valid_password',
      passwordConfirmation: 'valid_password',
      language: 'PT'
    },
    company: {
      corporateName: 'valid_name',
      companyType: 1
    },
    pin: 'PinValid'
  }
})

export const makeFakeRequestLogin = async (): Promise<HttpRequest> => ({
  body: {
    email: 'valid_email@mail.com',
    password: 'valid_password'
  }
})

export const makeFakeRequestInvalidLogin = async (): Promise<HttpRequest> => ({
  body: {
    email: 'invalid@email.com',
    password: 'invalid_password'
  }
})

export const makeFakeRequest = async (): Promise<HttpRequest> => ({
  body: {
    user: {
      userName: 'valid_name',
      email: 'valid_email@mail.com',
      companyId: 1,
      phone: 'valid_phone',
      userTypeId: 'cli'
    },
    userConfig: {
      language: 'PT',
      tempUnit: '°C',
      weightUnit: 'Gramas',
      theme: 'Light'
    }
  }
})

export const makeFakeRequestGetUser = async (): Promise<HttpRequest> => ({
  body: {
    idUser: 1
  }
})

// User Config mock

export const mockUserConfigsModel = (userId: number): ConfigsModel => (
  {
    userId: userId,
    language: 'PT',
    tempUnit: '°C',
    weightUnit: 'Gramas',
    theme: 'Light'
  }
)

export const mockInsertUserConfigs = async (): Promise<{ idUser: number, idCompany: number, idUserConfigs: number }> => {
  const user = await mockInsertUser()
  await deleteAll(testConnection, 'userConfigs')
  const consfigResult = await insertOne(testConnection, 'userConfigs', mockUserConfigsModel(user.idUser))
  return { idUser: user.idUser, idCompany: user.idCompany, idUserConfigs: consfigResult.insertId }
}

export const mockReturnUserConfigs = (): ConfigsModel => (Object.assign(mockUserConfigsModel(1), { id: 1 }))

export const mockUpdateUserConfigs = async (): Promise<UpdateConfigsModel> => {
  const userConfigs = await mockInsertUserConfigs()
  const userResult = Object.assign(mockUserConfigsModel(userConfigs.idUser), { id: userConfigs.idUserConfigs })
  return userResult
}

export const mockAddUserConfigs = async (): Promise<ConfigsModel> => {
  const user = await mockInsertUser()
  const configResult = mockUserConfigsModel(user.idUser)
  return configResult
}
export const makeFakeRequestUserConfig = async (): Promise<HttpRequest> => ({
  body: {
    userConfigs: mockReturnUserConfigs()
  }
})

// Company mock

export const mockCompanyModel = (): CompanyModel => (
  {
    corporateName: 'valid_name',
    companyType: 1
  }
)

export const mockInsertCompany = async (): Promise<{ idCompany: number }> => {
  await deleteAll(testConnection, 'company')
  const companyResult = await insertOne(testConnection, 'company', mockCompanyModel())
  return { idCompany: companyResult.insertId }
}

export const mockReturnCompany = (): CompanyModel => (Object.assign(mockCompanyModel(), { id: 1 }))
