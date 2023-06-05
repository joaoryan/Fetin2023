import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { Pool } from 'mysql'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAddGroupController } from '../factories/controllers/add-group/add-group-controller-factory'
import { makeUpdateGroupController } from '../factories/controllers/update-group/update-group-controller-factory'
import { makeDeleteGroupController } from '../factories/controllers/delete-group/delete-group-controller-factory'
import { makeLoadGroupController } from '../factories/controllers/load-group/load-group-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))
  router.post('/group', auth, adptRoute(makeAddGroupController(pool)))
  router.put('/group/:id', auth, adptRoute(makeUpdateGroupController(pool)))
  router.delete('/group/:id', auth, adptRoute(makeDeleteGroupController(pool)))
  router.get('/menu/:menuId/group', auth, adptRoute(makeLoadGroupController(pool)))
}
