export const updateEquipment = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Equipment'],
    summary: 'Update an equipment',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'Id of the equipment',
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
              equipment: {
                $ref: '#/schemas/equipment'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Equipment created successfully',
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