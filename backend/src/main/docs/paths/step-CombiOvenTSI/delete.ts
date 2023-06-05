export const deleteStepCombiOvenTSI = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['StepCombiOvenTSI'],
    summary: 'Delete a StepCombiOvenTSI',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/deleteStepCombiOvenTSI'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'StepCombiOvenTSI deleted successfully',
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