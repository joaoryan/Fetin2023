export const updateGroup = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['MenuGroup'],
    summary: 'Update an group',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'Id of the group',
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
              group: {
                $ref: '#/schemas/group'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Group update successfully',
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