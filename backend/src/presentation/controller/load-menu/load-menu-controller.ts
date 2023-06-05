import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { LoadStepSpeedOvenById } from '../load-step-by-id/load-step-SpeedOven-by-id-controller-protocols'
import { Controller, HttpRequest, HttpResponse, LoadMenuById, LoadCompanyMenuConfigs, LoadMenuGroup, LoadRecipe, LoadStepCombiOvenTSI, LoadStepCombiOvenCMAX, LoadRecipeCMAX, Validation } from './load-user-menu-controller-protocols'

export class LoadMenuController implements Controller {
  private readonly loadUserMenuValidation: Validation
  private readonly loadUserMenu: LoadMenuById
  private readonly loadCompanyMenuConfigs: LoadCompanyMenuConfigs
  private readonly loadMenuGroup: LoadMenuGroup
  private readonly loadRecipe: LoadRecipe
  private readonly loadRecipeCMAX: LoadRecipeCMAX
  private readonly loadStepSpeedOvenById: LoadStepSpeedOvenById
  private readonly loadStepCombiOvenTSI: LoadStepCombiOvenTSI
  private readonly loadStepCombiOvenCMAX: LoadStepCombiOvenCMAX

  constructor (loadUserMenuValidation: Validation, loadUserMenu: LoadMenuById, loadCompanyMenuConfigs: LoadCompanyMenuConfigs, loadMenuGroup: LoadMenuGroup, loadRecipe: LoadRecipe, loadRecipeCMAX: LoadRecipeCMAX, loadStepSpeedOvenById: LoadStepSpeedOvenById, loadStepCombiOvenTSI: LoadStepCombiOvenTSI, loadStepCombiOvenCMAX: LoadStepCombiOvenCMAX) {
    this.loadUserMenuValidation = loadUserMenuValidation
    this.loadUserMenu = loadUserMenu
    this.loadCompanyMenuConfigs = loadCompanyMenuConfigs
    this.loadMenuGroup = loadMenuGroup
    this.loadRecipe = loadRecipe
    this.loadRecipeCMAX = loadRecipeCMAX
    this.loadStepSpeedOvenById = loadStepSpeedOvenById
    this.loadStepCombiOvenTSI = loadStepCombiOvenTSI
    this.loadStepCombiOvenCMAX = loadStepCombiOvenCMAX
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const menuError = this.loadUserMenuValidation.validate(httpRequest.params)
      if (menuError) return badRequest(menuError)

      const { id } = httpRequest.params
      const menu = await this.loadUserMenu.loadMenu(id)
      if (!menu) return noContent()

      if (menu.equipTypeId === 4) {
        const recipeCMAX = await this.loadRecipeCMAX.loadRecipeCMAX(menu.id)

        for (const recipeItem of recipeCMAX) {
          const recipeStep = await this.loadStepCombiOvenCMAX.loadStepCombiOvenCMAX(recipeItem.id)
          Object.assign(recipeItem, { steps: recipeStep })
        }
        Object.assign(menu, { recipes: recipeCMAX })
      } else {
        const menuConfig = await this.loadCompanyMenuConfigs.loadMenuConfigs(menu.id)
        const menuGroup = await this.loadMenuGroup.loadMenuGroup(menu.id)
        for (const groupItem of menuGroup) {
          const groupRecipe = await this.loadRecipe.loadRecipe(groupItem.id)
          for (const recipeItem of groupRecipe) {
            if (menu.equipTypeId === 2) {
              const recipeStep = await this.loadStepCombiOvenTSI.loadStepCombiOvenTSI(recipeItem.id)
              Object.assign(recipeItem, { steps: recipeStep })
            } else {
              const recipeStep = await this.loadStepSpeedOvenById.loadStepSpeedOvenById(recipeItem.id)
              Object.assign(recipeItem, { steps: recipeStep })
            }
          }
          Object.assign(groupItem, { recipes: groupRecipe })
        }
        Object.assign(menu, { configs: menuConfig }, { groups: menuGroup })
      }
      return ok({
        menu: menu
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
