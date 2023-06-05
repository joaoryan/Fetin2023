export const addCookbook = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Cookbook'],
    summary: 'Create a cookbook',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              cookbook: {
                $ref: '#/schemas/cookbook'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Cookbook created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/cookbook'
            }
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