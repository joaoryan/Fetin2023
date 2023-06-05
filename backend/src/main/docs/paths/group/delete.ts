export const deleteGroup = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['MenuGroup'],
    summary: 'Delete an group',
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
    responses: {
      200: {
        description: 'Group delete successfully',
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