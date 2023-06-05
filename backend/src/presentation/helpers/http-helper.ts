import { HttpResponse } from '../protocols'
import { ServerError, UnauthorizedError } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const created = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 201,
  body: data
})

export const download = (path: string): HttpResponse => ({
  statusCode: 200,
  body: null,
  download: path
})
