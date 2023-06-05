import { Pool } from 'mysql'
import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeLoadPermissionTypesController } from '../factories/controllers/load-permissionTypes/load-permissionTypes-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))
  router.get('/permissionTypes/:id', auth, adptRoute(makeLoadPermissionTypesController(pool)))
}
