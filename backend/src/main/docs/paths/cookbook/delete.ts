export const deleteCookbook = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Cookbook'],
    summary: 'Delete a cookbook',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/deleteCookbook'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Cookbook delete successfully',
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