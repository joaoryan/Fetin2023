/* eslint-disable eol-last */
import { UpdateConfigs } from '../../../domain/usecases/update-configs'
import { UpdateConfigsError } from '../../errors/update-configs-error'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './update-configs-controller-protocols'

export class UpdateConfigsController implements Controller {
  private readonly configsValidation: Validation
  private readonly updateConfigs: UpdateConfigs

  constructor (configsValidation: Validation, updateConfigs: UpdateConfigs) {
    this.configsValidation = configsValidation
    this.updateConfigs = updateConfigs
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.configsValidation.validate(httpRequest.body.userConfigs)
      if (error) {
        return badRequest(error)
      }

      const updateConfigs = httpRequest.body.userConfigs
      const configs = await this.updateConfigs.updateConfigs(updateConfigs)
      if (!configs) {
        return forbidden(new UpdateConfigsError())
      }

      return ok({
        updatedConfigs: configs
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
