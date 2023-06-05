export const deleteRecipeCmaxSchema = {
  type: 'object',
  properties: {
    idArray: {
      type: 'array',
      items: {
        allOf: [{
          type: 'number'
        }]
      }
    },
    equipType: {
      type: 'integer'
    },
  },
  required: ['idArray', 'equipType']
}