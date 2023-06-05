import { Pool } from 'mysql'
import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeAddStepCombiOvenTSIController } from '../factories/controllers/add-step-CombiOvenTSI/add-step-CombiOvenTSI-controller-factory'
import { makeDeleteStepCombiOvenTSIController } from '../factories/controllers/delete-step-CombiOvenTSI/delete-step-CombiOvenTSI-controller-factory'
import { makeLoadStepCombiOvenTSIController } from '../factories/controllers/load-step-CombiOvenTSI/load-step-CombiOvenTSI-factory'
import { makeUpdateStepCombiOvenTSIController } from '../factories/controllers/update-step-CombiOvenTSI/update-step-CombiOvenTSI-controller-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))
  router.post('/stepCombiOvenTSI', auth, adptRoute(makeAddStepCombiOvenTSIController(pool)))
  router.delete('/stepCombiOvenTSI/:id', auth, adptRoute(makeDeleteStepCombiOvenTSIController(pool)))
  router.get('/:stepFrom/recipe/:recipeId/stepsCombiOvenTSI', auth, adptRoute(makeLoadStepCombiOvenTSIController(pool)))
  router.put('/stepCombiOvenTSI/:id', auth, adptRoute(makeUpdateStepCombiOvenTSIController(pool)))
}
