export const addGroup = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['MenuGroup'],
    summary: 'Create an group',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              group: {
                $ref: '#/schemas/addGroup'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Group created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/addGroup'
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