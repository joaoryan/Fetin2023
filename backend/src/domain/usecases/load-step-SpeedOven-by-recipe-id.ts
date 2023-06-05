import { StepSpeedOvenModel } from '../models/stepSpeedOven'

export interface LoadStepsSpeedOvenByRecipeId {
  loadStepsSpeedOvenByRecipeId (idRecipe: number): Promise<StepSpeedOvenModel[] | null>
}
