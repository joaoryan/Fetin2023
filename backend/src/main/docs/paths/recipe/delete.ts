export const deleteRecipe = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Recipe'],
    summary: 'Delete an recipe',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/deleteRecipe'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Recipe delete successfully',
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