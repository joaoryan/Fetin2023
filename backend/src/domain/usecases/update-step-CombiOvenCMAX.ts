export interface UpdateStepCombiOvenCMAXModel {
  id: number,
  recipeId: number,
  menuId: number,
  stepPosition: number,
  isActive: boolean,
  stepTemperature: number,
  ovenFunction: number,
  timeOrProbe: number,
  stepTime: number,
  probeTargetTemp: number,
  stepSteamLevel: number,
  steamInjection: number,
  dumperStatus: number,
  stepFrom: string
}

export interface UpdateStepCombiOvenCMAX {
  updateStepCombiOvenCMAX(id: number, stepCombiOvenCMAX: UpdateStepCombiOvenCMAXModel): Promise<boolean>
}
