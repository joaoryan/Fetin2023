export class LoadStepSpeedOvenError extends Error {
  constructor () {
    super('StepSpeedOven not found')
    this.name = 'LoadStepSpeedOvenError'
  }
}
