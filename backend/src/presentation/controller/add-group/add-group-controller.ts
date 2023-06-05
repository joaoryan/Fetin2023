import { MenuGroupModel } from '../../../domain/models/menu-group'
import { AddGroup } from '../../../domain/usecases/add-group'
import { CreateGroupError } from '../../errors/create-group-error'
import { GroupParamsError } from '../../errors/group-params-error'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-group-controller-protocols'

export class AddGroupController implements Controller {
  private readonly groupValidation: Validation
  private readonly addGroup: AddGroup

  constructor (groupValidation: Validation, addGroup: AddGroup) {
    this.groupValidation = groupValidation
    this.addGroup = addGroup
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.group) return badRequest(new GroupParamsError())
      const groupRequest = httpRequest.body.group
      const error = this.groupValidation.validate(groupRequest)
      if (error) {
        return badRequest(error)
      }
      const group = await this.addGroup.addGroup(groupRequest)
      return created<MenuGroupModel>(group)
    } catch (error) {
      return serverError(new CreateGroupError())
    }
  }
}
