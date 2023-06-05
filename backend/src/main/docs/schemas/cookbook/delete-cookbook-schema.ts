export const deleteCookbookSchema = {
  type: 'object',
  properties: {
    idArray: {
      type: 'array',
      items: {
        allOf: [{
          type: 'number'
        }]
      }
    }
  },
  required: ['idArray']
}