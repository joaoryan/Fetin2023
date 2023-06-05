import { Pool } from 'mysql'
import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeLoadUserTypesController } from '../factories/controllers/load-userTypes/load-userTypes-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))
  router.get('/userTypes/:companyTypeId', auth, adptRoute(makeLoadUserTypesController(pool)))
}
