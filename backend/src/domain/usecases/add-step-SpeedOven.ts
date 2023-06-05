import { StepSpeedOvenModel } from '../models/stepSpeedOven'

export interface AddStepSpeedOvenModel {
  recipeId: number,
  equipTypeId: number,
  menuId: number,
  stepPosition: number,
  isActive: boolean
  stepTemperature: number,
  tempIsPreheat: boolean,
  stepTime: string,
  hotAirSpeed: number,
  microwaves: number,
  internalResistance: number,
  stepInfo: string,
  stepFrom: string
}

export interface AddStepSpeedOven {
  addStepSpeedOven(stepSpeedOven: AddStepSpeedOvenModel): Promise<StepSpeedOvenModel>
}
