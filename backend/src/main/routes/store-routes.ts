import { Pool } from 'mysql'
import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeAddStoreController } from '../factories/controllers/add-store/add-store-controller-factory'
import { makeDeleteStoreController } from '../factories/controllers/delete-store/delete-store-controller-factory'
import { makeLoadStoreByIdController } from '../factories/controllers/load-store-by-id/load-store-by-id-factory'
import { makeLoadStoresByCompanyIdController } from '../factories/controllers/load-stores-by-company-id/load-stores-by-company-id-factory'
import { makeUpdateStoreController } from '../factories/controllers/update-stores/update-store-controller-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))
  router.post('/store', auth, adptRoute(makeAddStoreController(pool)))
  router.delete('/store/:id', auth, adptRoute(makeDeleteStoreController(pool)))
  router.get('/store/:id', auth, adptRoute(makeLoadStoreByIdController(pool)))
  router.get('/user/:userId/privilege/:userPrivilegeUser/company/:companyId/stores', auth, adptRoute(makeLoadStoresByCompanyIdController(pool)))
  router.put('/store/:id', auth, adptRoute(makeUpdateStoreController(pool)))
}
