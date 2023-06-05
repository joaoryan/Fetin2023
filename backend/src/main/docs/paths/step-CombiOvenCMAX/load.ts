export const loadStepCombiOvenCMAX = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['StepCombiOvenCMAX'],
    summary: 'Retrieve a list of StepCombiOvenCMAX from a given Recipe',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'Id of the recipe that owns the StepCombiOvenCMAX',
      schema: {
        type: 'integer',
        format: 'int64',
        minimum: 1
      }
    }],
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                allOf: [
                  {
                    $ref: '#/schemas/stepCombiOvenCMAX',
                  },
                  {
                    type: 'object',
                  }
                ]
              }
            }
          }
        }
      },
      204: {
        description: 'No content'
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