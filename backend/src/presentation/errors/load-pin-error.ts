export class LoadEquipByPinError extends Error {
  constructor () {
    super('Pin not found')
    this.name = 'LoadEquipByPinError'
  }
}
