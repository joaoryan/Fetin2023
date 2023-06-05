export class EquipmentNotBelongUser extends Error {
  constructor () {
    super('Equipment does not belong to the user')
    this.name = 'EquipmentNotBelongUser'
  }
}
