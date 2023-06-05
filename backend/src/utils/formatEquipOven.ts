import { EquipModel } from '../domain/models/equipment'

export const formatEquipOven = (equipmentResponse: EquipModel) => {
  return {
    idEquipment: equipmentResponse.id,
    name: equipmentResponse.name,
    typeEquipment: equipmentResponse.typeEquipment,
    idUser: equipmentResponse.idUser,
    dataUpdate: equipmentResponse.dataUpdate,
    statusData: equipmentResponse.statusData,
    appUpdate: equipmentResponse.appUpdate,
    statusApp: equipmentResponse.statusApp,
    serialNumber: equipmentResponse.serialNumber,
    menuId: equipmentResponse.menuId,
    sentMenu: equipmentResponse.sentMenu,
    iokPin: equipmentResponse.iokPin,
    creationDate: equipmentResponse.creationDate,
    sendConfig: true,
    softwareVersion: equipmentResponse.softwareVersion,
    hashSw: equipmentResponse.hashSw
  }
}
