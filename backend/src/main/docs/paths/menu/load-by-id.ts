export const loadMenuById = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Menu'],
    summary: 'Retrieve a menu by its id',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'Id of the menu',
      schema: {
        type: 'integer',
        format: 'int64',
        minimum: 1
      }
    }],
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              allOf: [
                {
                  $ref: '#/schemas/menu',
                },
                {
                  type: 'object',
                  properties: {
                    modelName: {
                      type: 'string'
                    },
                    categoryName: {
                      type: 'string'
                    },
                    storeName: {
                      type: 'string'
                    },
                    menuName: {
                      type: 'string'
                    },
                    address: {
                      type: 'string'
                    },
                    city: {
                      type: 'string'
                    },
                    zipCode: {
                      type: 'string'
                    }

                  }
                }
              ]
            }
          }
        }
      },
      204: {
        description: 'No content'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}