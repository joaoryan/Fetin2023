export const countEquipment = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Equipment'],
    summary: 'Returns equipment count based on sent condition',
    parameters: [{
      name: 'condition',
      in: 'query',
      description: 'field that will be used as a count condition',
      schema: {
        type: 'object',
        properties: {
          where: {
            type: 'object',
            maxProperties: 1,
            minProperties: 1,
            additionalProperties: {
              type: 'string'
            }
          }
        }
      }
    }],
    
    responses: {
      200: {
        description: 'Equipment created successfully',
        content: {
          'application/json' : {
            schema: {
              type: 'object',
              properties: {
                count: {
                  type: 'integer'
                }
              }
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