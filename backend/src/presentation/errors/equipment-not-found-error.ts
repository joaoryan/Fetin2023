export class EquipmentNotFoundError extends Error {
  constructor () {
    super('Equipment not found')
    this.name = 'EquipmentNotFoundError'
  }
}
