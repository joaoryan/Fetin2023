export class EquipmentCreationError extends Error {
  constructor () {
    super('Equipment creation error.')
    this.name = 'EquipmentCreationError'
  }
}
