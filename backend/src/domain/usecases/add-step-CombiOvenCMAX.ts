import { StepCombiOvenCMAXModel } from '../models/stepCombiOvenCMAX'

export interface AddStepCombiOvenCMAXModel {
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

export interface AddStepCombiOvenCMAX {
    addStepCombiOvenCMAX(stepCombiOvenCMAX: AddStepCombiOvenCMAXModel): Promise<StepCombiOvenCMAXModel>
}
