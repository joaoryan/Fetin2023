export interface UpdateStepCombiOvenTSIModel {
  id: number,
  recipeId: number,
  menuId: number,
  equipTypeId: number,
  stepPosition: number,
  isActive: boolean,
  stepTemperature: number,
  steamPercentage: number,
  fanSpeed: number,
  steamInjection: number,
  stepInfo: string,
  endByTime: boolean,
  stepTime: number,
  probeTargetTemp: number,
  stepFrom: string
}

export interface UpdateStepCombiOvenTSI {
  updateStepCombiOvenTSI(id: number, stepCombiOvenTSI: UpdateStepCombiOvenTSIModel): Promise<boolean>
}
