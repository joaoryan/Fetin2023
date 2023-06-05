export const stepSpeedOvenPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['StepSpeedOven'],
    description: 'Cria um novo passo de uma receita para Speed Ovens',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addStepSpeedOven'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Passo criado com sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}

export const stepSpeedOvenByRecipeIdPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['StepSpeedOven', 'Recipe'],
    description: 'Busca passos dos Speed Ovens pelo id da receita',
    parameters: [{
      in: 'path',
      name: 'recipeId',
      description: 'ID da receita para buscar os passos dos Speed Ovens',
      required: true,
      schema: {
        type: 'number'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/stepSpeedOven'
            }
          }
        }
      },
      204: {
        description: 'Nenhum passo Speed Oven encontrado'
      },
      400: {
        schema: {
          $ref: '#/components/badRequest'
        }
      },
      403: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}

export const stepSpeedOvenByIdPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['StepSpeedOven'],
    description: '',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID do StepSpeedOven',
      required: true,
      schema: {
        type: 'number'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/stepSpeedOven'
            }
          }
        }
      },
      204: {
        description: 'Nenhum StepSpeedOven encontrad'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['StepSpeedOven'],
    description: 'Deleta um StepSpeedOven',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID do StepSpeedOven',
      required: true,
      schema: {
        type: 'number'
      }
    }],
    responses: {
      200: {
        description: 'StepSpeedOven deletado com sucesso',
        content: {}
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['StepSpeedOven'],
    description: 'Edita um StepSpeedOven',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID do StepSpeedOven',
      required: true,
      schema: {
        type: 'number'
      }
    }],
    responses: {
      200: {
        description: 'StepSpeedOven editado com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/stepSpeedOven'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
