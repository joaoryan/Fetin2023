import { StepCombiOvenTSIModel } from '../models/stepCombiOvenTSI'

export interface AddStepCombiOvenTSIModel {
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

export interface AddStepCombiOvenTSI {
    addStepCombiOvenTSI(stepCombiOvenTSI: AddStepCombiOvenTSIModel): Promise<StepCombiOvenTSIModel>
}
