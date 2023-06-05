export const deleteMenu = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Menu'],
    summary: 'Delete an menu',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'Id of the menu',
      schema: {
        type: 'integer',
        format: 'int64',
        minimum: 1
      }
    }],
    responses: {
      200: {
        description: 'Menu created successfully',
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