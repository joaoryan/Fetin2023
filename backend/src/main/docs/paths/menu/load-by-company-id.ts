export const loadMenuByCompanyId = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Menu'],
    summary: 'Retrieve a list of menu from a given company',
    parameters: [{
      name: 'companyId',
      in: 'path',
      required: true,
      description: 'Id of the company that owns the menu',
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
              type: 'array',
              items: {
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
                      }
                    }
                  }
                ]
              }
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