import { Pool } from 'mysql'
import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeAddStepCombiOvenCMAXController } from '../factories/controllers/add-step-CombiOvenCMAX/add-step-CombiOvenCMAX-controller-factory'
import { makeDeleteStepCombiOvenCMAXController } from '../factories/controllers/delete-step-CombiOvenCMAX/delete-step-CombiOvenCMAX-controller-factory'
import { makeLoadStepCombiOvenCMAXController } from '../factories/controllers/load-step-CombiOvenCMAX/load-step-CombiOvenCMAX-factory'
import { makeUpdateStepCombiOvenCMAXController } from '../factories/controllers/update-step-CombiOvenCMAX/update-step-CombiOvenCMAX-controller-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))
  router.post('/stepCombiOvenCMAX', auth, adptRoute(makeAddStepCombiOvenCMAXController(pool)))
  router.delete('/stepCombiOvenCMAX/:id', auth, adptRoute(makeDeleteStepCombiOvenCMAXController(pool)))
  router.get('/:stepFrom/recipe/:recipeId/stepsCombiOvenCMAX', auth, adptRoute(makeLoadStepCombiOvenCMAXController(pool)))
  router.put('/stepCombiOvenCMAX/:id', auth, adptRoute(makeUpdateStepCombiOvenCMAXController(pool)))
}
