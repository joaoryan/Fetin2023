export const updateRecipeCmax = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['RecipeCMAX'],
    summary: 'Update an recipeCmax',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'Id of the recipeCmax',
      schema: {
        type: 'integer',
        format: 'int64',
        minimum: 1
      }
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              recipe: {
                $ref: '#/schemas/recipeCmax'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'RecipeCmax update successfully',
        content: {
          'application/json': {
            schema: {}
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