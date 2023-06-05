import { Pool } from 'mysql'
import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { makeLoadCompanyTypesController } from '../factories/controllers/load-companyTypes/load-companyTypes-factory'

export default (router: Router, pool: Pool) => {
  router.get('/companyTypes', adptRoute(makeLoadCompanyTypesController(pool)))
}
