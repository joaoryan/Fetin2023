import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { Pool } from 'mysql'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAddRecipeController } from '../factories/controllers/add-recipe/add-recipe-controller-factory'
import { makeUpdateRecipeController } from '../factories/controllers/update-recipe/update-recipe-controller-factory'
import { makeDeleteRecipeController } from '../factories/controllers/delete-recipe/delete-recipe-controller-factory'
import { makeLoadRecipeController } from '../factories/controllers/load-recipe-by-group-id/load-recipe-factory'
import { makeLoadRecipeCmaxController } from '../factories/controllers/load-recipeCmax-by-menu-id/load-recipe-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))
  router.post('/recipe', auth, adptRoute(makeAddRecipeController(pool)))
  router.put('/recipe/:id', auth, adptRoute(makeUpdateRecipeController(pool)))
  router.delete('/recipe/array', auth, adptRoute(makeDeleteRecipeController(pool)))
  router.get('/group/:id/recipe', auth, adptRoute(makeLoadRecipeController(pool)))
  router.get('/menu/:id/recipeCmax', auth, adptRoute(makeLoadRecipeCmaxController(pool)))
  router.post('/recipeCmax', auth, adptRoute(makeAddRecipeController(pool)))
  router.put('/recipeCmax/:id', auth, adptRoute(makeUpdateRecipeController(pool)))
  router.delete('/recipeCmax/array', auth, adptRoute(makeDeleteRecipeController(pool)))
}
