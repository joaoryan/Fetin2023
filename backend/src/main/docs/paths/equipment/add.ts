export const addEquipment = {
  post: {
    tags: ['Equipment'],
    summary: 'Create an equipment(oven)',
    parameters: [{
      name: 'pin',
      in: 'path',
      required: true,
      description: 'Pin security',
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addEquipmentRequest'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Equipment created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/addEquipmentResponse'
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