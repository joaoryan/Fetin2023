export const loadRecipeCmaxByMenuId = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['RecipeCMAX'],
    summary: 'Retrieve a list of recipeCmax from a given menu',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'Id of the menu that owns the recipemax',
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
                    $ref: '#/schemas/recipeCmax',
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