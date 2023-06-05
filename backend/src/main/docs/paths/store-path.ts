export const storePath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Store'],
    description: 'Cria uma nova loja',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addStore'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Loja criada com sucesso'
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

export const storeByCompanyIdPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Store', 'Company'],
    description: 'Busca lojas pelo id da companhia',
    parameters: [{
      in: 'path',
      name: 'companyId',
      description: 'ID da companhia para buscar as lojas',
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
              type: 'array',
              items: {
                $ref: '#/schemas/store'
              }
            }
          }
        }
      },
      204: {
        description: 'Nenhuma loja encontrada'
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

export const storeByIdPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Store'],
    description: '',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID da loja',
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
              $ref: '#/schemas/store'
            }
          }
        }
      },
      204: {
        description: 'Nenhuma loja encontrada'
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
    tags: ['Store'],
    description: 'Deleta uma loja',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID da loja',
      required: true,
      schema: {
        type: 'number'
      }
    }],
    responses: {
      200: {
        description: 'Loja deletada com sucesso',
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
    tags: ['Store'],
    description: 'Edita uma loja',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID da loja',
      required: true,
      schema: {
        type: 'number'
      }
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/store'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Loja editada com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/store'
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
