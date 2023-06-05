export const menuSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    equipTypeId: {
      type: 'integer'
    },
    companyId: {
      type: 'integer'
    },
    menuName: {
      type: 'string'
    },
    creationDate: {
      type: 'string',
      format: 'date-time'
    },
    lastUpdate: {
      type: 'string',
      format: 'date-time'
    },
    menuVersion: {
      type: 'number'
    },
    deletionDate: {
      type: 'integer',
      format: 'date-time'
    },
    userId: {
      type: 'integer'
    },
    deletedBy: {
      type: 'string'
    },
    language: {
      type: 'string'
    }
  },
  required: ['id', 'menuName', 'equipTypeId', 'companyId', 'creationDate', 'lastUpdate', 'menuVersion', 'deletionDate', 'userId', 'deletedBy', 'language']
}