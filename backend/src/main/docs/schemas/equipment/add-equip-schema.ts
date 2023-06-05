export const addEquipmentRequestSchema = {
  type: 'object',
  properties: {
    idEquipment: {
      type: 'integer'
    },
    typeEquipment: {
      type: 'string'
    },
    dataUpdate: {
      type: 'boolean'
    },
    appUpdate: {
      type: 'boolean'
    },
    serialNumber: {
      type: 'string'
    },
    creationDate: {
      type: 'string',
      format: 'date-time'
    },
    softwareVersion: {
      type: 'string'
    },
  },
  required: ['idEquipment', 'typeEquipment', 'dataUpdate', 'appUpdate', 'serialNumber', 'creationDate', 'softwareVersion']
}

export const addEquipmentResponseSchema = {
  type: 'object',
  properties: {
    idEquipment: {
      type: 'integer'
    },
    name: {
      type: 'string'
    },
    menuId: {
      type: 'integer'
    },
    iokPin: {
      type: 'string'
    },
    typeEquipment: {
      type: 'string'
    },
    dataUpdate: {
      type: 'boolean'
    },
    appUpdate: {
      type: 'boolean'
    },
    serialNumber: {
      type: 'string'
    },
    creationDate: {
      type: 'string',
      format: 'date-time'
    },
    softwareVersion: {
      type: 'string'
    },
    idUser: {
      type: 'integer',
      required: false
    },
    storeId: {
      type: 'integer'
    },
    companyId: {
      type: 'integer'
    },
    sentMenu: {
      type: 'integer'
    },
    lastUpdate: {
      type: 'string',
      format: 'date-time'
    },
    categoryId: {
      type: 'integer'
    },
    statusData: {
      type: 'string'
    },
    statusApp: {
      type: 'string'
    },
    hashSw: {
      type: 'integer'
    },
  },
  required: [
    'idEquipment',
    'idUser',
    'typeEquipment',
    'storeId',
    'serialNumber',
    'creationDate',
    'softwareVersion',
    'sentMenu',
    'companyId',
    'iokPin',
    'name',
    'categoryId',
    'dataUpdate',
    'appUpdate',
    'f',
    'statusApp',
    'hashSw',
    'menuId',]
}
