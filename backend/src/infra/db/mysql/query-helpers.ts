import { CountEquipmentRepository } from '../../../data/protocols/db/equipment/count-equipment-repository'
export const loadEquipByCompanyIdSQL = (companyId: number) => `SELECT 
equipment.id as id,
equipment.name as name,
equipment.categoryId as categoryId,
equipment.typeEquipment as typeEquipment,
equipment.storeId as storeId,
equipment.serialNumber as serialNumber,
equipment.creationDate as creationDate,
equipment.softwareVersion as softwareVersion,
equipment.sentMenu as sentMenu,
equipment.companyId as companyId,
equipment.iokPin as iokPin,
equipment.idUser as idUser,
equipment.dataUpdate as dataUpdate,
equipment.appUpdate as appUpdate,
equipment.statusData as statusData,
equipment.statusApp as statusApp,
equipment.hashSw as hashSw,
equipment.menuId as menuId,
equipment.lastUpdate as lastUpdate,
categoryType.category as categoryName,
store.storeName as storeName,
store.latitude as latitude,
store.longitude as longitude
FROM equipment 
LEFT JOIN categoryType on equipment.categoryId = categoryType.id
LEFT JOIN store on equipment.storeId = store.id
WHERE equipment.companyId = ${companyId}`

export const loadEquipByIdSQL = (id: number) => `SELECT 
equipment.id as id,
equipment.name as name,
equipment.categoryId as categoryId,
equipment.typeEquipment as typeEquipment,
equipment.storeId as storeId,
equipment.serialNumber as serialNumber,
equipment.creationDate as creationDate,
equipment.softwareVersion as softwareVersion,
equipment.sentMenu as sentMenu,
equipment.companyId as companyId,
equipment.iokPin as iokPin,
equipment.idUser as idUser,
equipment.dataUpdate as dataUpdate,
equipment.appUpdate as appUpdate,
equipment.statusData as statusData,
equipment.statusApp as statusApp,
equipment.hashSw as hashSw,
equipment.menuId as menuId,
equipment.lastUpdate as lastUpdate,
categoryType.category as categoryName,
store.storeName as storeName,
menu.menuName as menuName,
CONCAT(store.street, ', ', store.streetNumber, ' - ', store.neighborhood) as address,
store.city as city,
store.state as state,
store.zipCode as zipCode
FROM equipment
LEFT JOIN categoryType on equipment.categoryId = categoryType.id
LEFT JOIN store on equipment.storeId = store.id
LEFT JOIN menu on equipment.sentMenu = menu.id
WHERE equipment.id = ${id}`

export const countEquipmentSQL = (where?: CountEquipmentRepository.Parameter) => {
  if (!where) return 'SELECT COUNT(*) as count FROM equipment'
  const key = Object.keys(where)[0]
  return `SELECT COUNT(*) as count FROM equipment WHERE ${key} = ${isNaN(+where[key]) ? `'${where[key]}'` : where[key]}`
}

export const loadEquipByUserIdSQL = (userId: number) => `SELECT 
equipment.id as id,
equipment.name as name,
equipment.categoryId as categoryId,
equipment.typeEquipment as typeEquipment,
equipment.storeId as storeId,
equipment.serialNumber as serialNumber,
equipment.creationDate as creationDate,
equipment.softwareVersion as softwareVersion,
equipment.sentMenu as sentMenu,
equipment.companyId as companyId,
equipment.iokPin as iokPin,
equipment.idUser as idUser,
equipment.dataUpdate as dataUpdate,
equipment.appUpdate as appUpdate,
equipment.statusData as statusData,
equipment.statusApp as statusApp,
equipment.hashSw as hashSw,
equipment.menuId as menuId,
equipment.lastUpdate as lastUpdate,
categoryType.category as categoryName,
store.storeName as storeName,
store.latitude as latitude,
store.longitude as longitude
FROM equipment 
LEFT JOIN categoryType on equipment.categoryId = categoryType.id
LEFT JOIN store on equipment.storeId = store.id
INNER JOIN UserBelongStore AS U ON (U.idStore = storeId) WHERE U.idUser = ${userId}`

export const loadUserByCorporateNameSQL = (corporateName: string) =>
  `SELECT u.*
FROM User u
JOIN company c ON u.companyId = c.id
WHERE c.corporateName = '${corporateName}' AND u.userTypeId LIKE '%adm%';`
