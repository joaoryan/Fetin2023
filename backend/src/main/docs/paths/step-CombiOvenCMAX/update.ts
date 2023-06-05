export const updateStepCombiOvenCMAX = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['StepCombiOvenCMAX'],
    summary: 'Update a StepCombiOvenCMAX',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'Id of the StepCombiOvenCMAX',
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
              stepCombiOvenCMAX: {
                $ref: '#/schemas/stepCombiOvenCMAX'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'StepCombiOvenCMAX updated successfully',
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