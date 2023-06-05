export const addRecipeCmax = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['RecipeCMAX'],
    summary: 'Create an recipeCmax',
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
                      $ref: '#/schemas/addRecipeCmax',
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
        description: 'RecipeCmax created successfully',
        content: {
          'application/json': {
            schema: [{
              $ref: '#/schemas/addRecipeCmax'
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