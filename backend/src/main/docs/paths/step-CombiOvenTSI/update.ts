export const updateStepCombiOvenTSI = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['StepCombiOvenTSI'],
    summary: 'Update a StepCombiOvenTSI',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'Id of the StepCombiOvenTSI',
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
              stepCombiOvenTSI: {
                $ref: '#/schemas/stepCombiOvenTSI'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'StepCombiOvenTSI updated successfully',
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