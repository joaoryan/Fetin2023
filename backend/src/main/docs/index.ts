import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'IOK PraticaUI API',
    description: 'API de acesso aos dados da aplicação PraticaUi.',
    version: '0.0.2'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Company',
    description: ''
  }, {
    name: 'Configs',
    description: ''
  }, {
    name: 'Equipment',
    description: 'Endpoints for equipment'
  }, {
    name: 'LoadMenuConfigs',
    description: ''
  }, {
    name: 'MenuConfigs',
    description: ''
  }, {
    name: 'MenuGroup',
    description: 'Endpoints for group'
  }, {
    name: 'Menu',
    description: 'Endpoints for menu'
  }, {
    name: 'Recipe',
    description: 'Endpoints for recipe'
  }, {
    name: 'RecipeCMAX',
    description: 'Endpoints for recipeCmax'
  }, {
    name: 'StepCombiOvenCMAX',
    description: 'API relacionada aos passos das receitas do C-MAX'
  }, {
    name: 'StepCombiOvenTSI',
    description: 'API relacionada aos passos das receitas do TSi'
  }, {
    name: 'StepSpeedOven',
    description: 'API relacionada aos passos dos Speed Ovens.'
  }, {
    name: 'Store',
    description: 'API relacionada às lojas.'
  }, {
    name: 'Cookbook',
    description: 'Endpoints for cookbook.'
  }, {
    name: 'User',
    description: ''
  }],
  paths,
  schemas,
  components
}
