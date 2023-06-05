import { Pool } from 'mysql'
import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeAddStepSpeedOvenController } from '../factories/controllers/add-step-SpeedOven/add-step-SpeedOven-controller-factory'
import { makeDeleteStepSpeedOvenController } from '../factories/controllers/delete-step-SpeedOven/delete-step-SpeedOven-controller-factory'
import { makeLoadStepSpeedOvenByIdController } from '../factories/controllers/load-step-SpeedOven-by-id/load-step-SpeedOven-by-id-factory'
import { makeLoadStepsSpeedOvenByRecipeIdController } from '../factories/controllers/load-steps-SpeedOven-by-recipe-id/load-steps-SpeedOven-by-recipe-id-factory'
import { makeUpdateStepSpeedOvenController } from '../factories/controllers/update-step-SpeedOven/update-step-SpeedOven-controller-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))
  router.post('/stepSpeedOven', auth, adptRoute(makeAddStepSpeedOvenController(pool)))
  router.delete('/stepSpeedOven/:id', auth, adptRoute(makeDeleteStepSpeedOvenController(pool)))
  router.get('/stepSpeedOven/:id', auth, adptRoute(makeLoadStepSpeedOvenByIdController(pool)))
  router.get('/:stepFrom/recipe/:recipeId/stepsSpeedOven', auth, adptRoute(makeLoadStepsSpeedOvenByRecipeIdController(pool)))
  router.put('/stepSpeedOven/:id', auth, adptRoute(makeUpdateStepSpeedOvenController(pool)))
}
