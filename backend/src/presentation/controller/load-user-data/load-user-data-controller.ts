import { LoadCompanyById } from '../../../domain/usecases/load-company-by-id'
import { LoadConfigsByUserId } from '../../../domain/usecases/load-configs-by-user-id'
import { LoadUserById } from '../../../domain/usecases/load-user-by-id'
import { CompanyNotFoundError, ConfigsNotFoundError, UserNotFoundError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoadUserDataController implements Controller {
  private readonly loadUserById: LoadUserById
  private readonly loadCompanyById: LoadCompanyById
  private readonly loadConfigsByUserId: LoadConfigsByUserId

  constructor (loadUserById: LoadUserById, loadCompanyById: LoadCompanyById, loadConfigsByUserId: LoadConfigsByUserId) {
    this.loadUserById = loadUserById
    this.loadCompanyById = loadCompanyById
    this.loadConfigsByUserId = loadConfigsByUserId
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { idUser } = httpRequest.body
      const user = await this.loadUserById.load(idUser)
      if (!user) {
        return badRequest(new UserNotFoundError())
      }
      const company = await this.loadCompanyById.load(user.companyId)
      if (!company) {
        return badRequest(new CompanyNotFoundError())
      }
      const configs = await this.loadConfigsByUserId.load(user.id)
      if (!configs) {
        return badRequest(new ConfigsNotFoundError())
      }

      return ok({
        user: user,
        company: company,
        configs: configs
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
