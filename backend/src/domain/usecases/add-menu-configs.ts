export interface AddMenuConfigsModel {
  menuId: number,
  preHeat1: number,
  preHeat2: number,
  preHeat2Enabled: boolean,
  stabilizationTime: string,
  dateFormat: string,
  timeFormat: string,
  manualModeEnabled: boolean,
  favoritesEnabled: boolean,
  repeatRecipeEnabled: boolean,
  heatBrownMoreEnabled: boolean,
  temperatureUnit: string,
  weightUnit: string,
  theme: string,
  introduction: boolean,
  combiOvenEnabled: boolean,
  multipleCookingEnabled: boolean,
  technicookRecipesEnabled: boolean,
  editGroupsEnabled: boolean,
  operatorModeEnabled: boolean
}

export interface AddMenuConfigs {
  addConfigs(account: AddMenuConfigsModel): Promise<void>
}
