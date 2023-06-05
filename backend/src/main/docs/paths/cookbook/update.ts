export const updateCookbook = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Cookbook'],
    summary: 'Update an cookbook',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'Id of the cookbook',
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
              cookbook: {
                $ref: '#/schemas/cookbook'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Cookbook update successfully',
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