export const deleteRecipeCmax = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['RecipeCMAX'],
    summary: 'Delete an recipeCmax',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/deleteRecipeCmax'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'RecipeCmax delete successfully',
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