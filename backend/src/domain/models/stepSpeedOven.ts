export interface StepSpeedOvenModel {
    id?: number,
    recipeId: number,
    equipTypeId: number,
    menuId: number,
    stepPosition: number,
    isActive: boolean,
    stepTemperature: number,
    tempIsPreheat: boolean,
    stepTime: string,
    hotAirSpeed: number,
    microwaves: number,
    internalResistance: number,
    stepInfo: string,
    stepFrom: string
}
