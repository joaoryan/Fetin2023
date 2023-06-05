import { addMenuSchema } from '../../schemas/menu/add-menu-schema'
export const updateMenu = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Menu'],
    summary: 'Update an menu',
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
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              menu: {
                $ref: '#/schemas/menu'
              },
              menuConfigs: {
                $ref: '#/schemas/menuConfigs'
              }
            }
          }
        }
      }
    },
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