import { DownloadUpdate } from '../../../domain/usecases/download-update'
import { ServerError } from '../../errors'
import { badRequest, download, noContent, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class DownloadUpdateController implements Controller {
  private readonly downloadUpdate: DownloadUpdate
  private readonly validation: Validation
  constructor (downloadUpdate: DownloadUpdate, validation: Validation) {
    this.downloadUpdate = downloadUpdate
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest<DownloadUpdate.Request>): Promise<HttpResponse<DownloadUpdate.Response>> {
    try {
      const validationError = this.validation.validate(httpRequest.params)
      if (validationError) return badRequest(validationError)
      const response = await this.downloadUpdate.load(httpRequest.params.ovenModel)
      if (!response) return noContent()
      return download(response)
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
