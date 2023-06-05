/* eslint-disable no-undef */
import { LoadCompanyMenuConfigs } from './load-menu-by-company-id-controller-protocols'
import { LoadCompanyMenuController } from './load-menu-by-company-id-controller'
import { ok, serverError } from '../../helpers/http-helper'
import { LoadCompanyMenu } from '../../../domain/usecases/load-company-menu'
import { MenuModel } from '../../../domain/models/menu'
import { MenuConfigsModel } from '../../../domain/models/menu-configs'
import { mockLoadMenuByCompanyIdRequest, mockReturnMenu, mockReturnMenuAndConfig, mockReturnMenuConfig } from '../../../domain/mocks/menus'

const makeLoadCompanyMenu = (): LoadCompanyMenu => {
  class LoadCompanyMenuStub implements LoadCompanyMenu {
    loadMenu (idCompany: number): Promise<MenuModel[] | null> {
      return new Promise(resolve => resolve([mockReturnMenu()]))
    }
  }
  return new LoadCompanyMenuStub()
}

const makeLoadCompanyMenuConfigs = (): LoadCompanyMenuConfigs => {
  class LoadUserCompanyCofigRepositoryStub implements LoadCompanyMenuConfigs {
    async loadMenuConfigs (idMenu: number): Promise<MenuConfigsModel | null> {
      return new Promise(resolve => resolve(mockReturnMenuConfig()))
    }
  }
  return new LoadUserCompanyCofigRepositoryStub()
}

interface SutTypes {
  sut: LoadCompanyMenuController
  loadCompanyMenuStub: LoadCompanyMenu
  loadCompanyMenuConfigsStub: LoadCompanyMenuConfigs
}

const makeSut = (): SutTypes => {
  const loadCompanyMenuStub = makeLoadCompanyMenu()
  const loadCompanyMenuConfigsStub = makeLoadCompanyMenuConfigs()

  const sut = new LoadCompanyMenuController(loadCompanyMenuStub, loadCompanyMenuConfigsStub)
  return {
    sut,
    loadCompanyMenuStub,
    loadCompanyMenuConfigsStub
  }
}

describe('LoadCompanyMenu Controller', () => {
  test('Should call loadCompanyMenuStub with correct values', async () => {
    const { sut, loadCompanyMenuStub } = makeSut()
    const addMenuSpy = jest.spyOn(loadCompanyMenuStub, 'loadMenu')
    const httpRequest = await mockLoadMenuByCompanyIdRequest()
    const { companyId } = httpRequest.params
    await sut.handle(httpRequest)
    expect(addMenuSpy).toHaveBeenCalledWith(companyId)
  })

  test('Should return 500 loadCompanyMenu throws', async () => {
    const { sut, loadCompanyMenuStub } = makeSut()
    jest.spyOn(loadCompanyMenuStub, 'loadMenu').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = await mockLoadMenuByCompanyIdRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await mockLoadMenuByCompanyIdRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      menu: [mockReturnMenuAndConfig()]
    }))
  })
})
