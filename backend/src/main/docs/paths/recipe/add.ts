export const addRecipe = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Recipe'],
    summary: 'Create an recipe',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          type: 'object',
          schema: {
            type: 'object',
            properties: {
              recipe: {
                type: 'array',
                items: {
                  allOf: [
                    {
                      $ref: '#/schemas/addRecipe',
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Recipe created successfully',
        content: {
          'application/json': {
            schema: [{
              $ref: '#/schemas/addRecipe'
            }]
          }
        }
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