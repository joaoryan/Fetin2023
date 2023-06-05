import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { Pool } from 'mysql'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAddMenuController } from '../factories/controllers/add-menu/add-menu-controller-factory'
import { makeLoadMenuController } from '../factories/controllers/load-menu/load-menu-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeLoadCompanyMenuController } from '../factories/controllers/load-company-menu/load-company-menu-factory'
import { makeUpdateMenuController } from '../factories/controllers/update-menu/update-menu-controller-factory'
import { makeDeleteMenuController } from '../factories/controllers/delete-menu/delete-menu-controller-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))
  router.post('/menu', auth, adptRoute(makeAddMenuController(pool)))
  router.get('/menu/:id', auth, adptRoute(makeLoadMenuController(pool)))
  router.get('/company/:companyId/menu', auth, adptRoute(makeLoadCompanyMenuController(pool)))
  router.put('/menu/:id', auth, adptRoute(makeUpdateMenuController(pool)))
  router.delete('/menu/:id', auth, adptRoute(makeDeleteMenuController(pool)))
}
