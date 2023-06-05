export const addMenu = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Menu'],
    summary: 'Create an menu',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              menu: {
                $ref: '#/schemas/addMenu'
              },
              menuConfigs: {
                $ref: '#/schemas/addMenuConfigs'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Menu created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/menu/add-menu-schema'
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