import { Pool } from 'mysql'
import { Router } from 'express'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adptRoute } from '../adapters/express-route-adapter'
import { makeDownloadUpdateController } from '../factories/controllers/download-update/download-update-factory'
import { makeUpdateSoftwareController } from '../factories/controllers/update-software/update-software-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))
  router.get('/download/updateFile/:ovenModel', auth, adptRoute(makeDownloadUpdateController(pool)))
  router.get('download/updateFile/:ovenModel/:iokPin', auth, adptRoute(makeUpdateSoftwareController(pool)))
}
