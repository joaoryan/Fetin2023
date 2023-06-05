export const updateRecipe = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Recipe'],
    summary: 'Update an recipe',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'Id of the recipe',
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
                $ref: '#/schemas/recipe'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Recipe update successfully',
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