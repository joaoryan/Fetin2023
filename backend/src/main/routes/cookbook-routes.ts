import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { Pool } from 'mysql'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeLoadRecipeCookbookController } from '../factories/controllers/load-recipe-cookbook/load-recipe-cookbook-factory'
import { makeUpdateCookbookController } from '../factories/controllers/update-cookbook/update-cookbook-controller-factory'
import { makeAddCookbookController } from '../factories/controllers/add-cookbook/add-cookbook-controller-factory'
import { makeDeleteCookbookController } from '../factories/controllers/delete-cookbook/delete-cookbook-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))
  router.post('/cookbook', auth, adptRoute(makeAddCookbookController(pool)))
  router.put('/cookbook/:id', auth, adptRoute(makeUpdateCookbookController(pool)))
  router.delete('/cookbook/array', auth, adptRoute(makeDeleteCookbookController(pool)))
  router.get('/company/:id/cookbook', auth, adptRoute(makeLoadRecipeCookbookController(pool)))
}
