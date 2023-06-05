export const addStepCombiOvenCMAX = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['StepCombiOvenCMAX'],
    summary: 'Create a StepCombiOvenCMAX',
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
      201: {
        description: 'StepCombiOvenCMAX created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/stepCombiOvenCMAX'
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