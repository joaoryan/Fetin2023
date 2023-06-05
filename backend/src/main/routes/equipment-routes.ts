import { Pool } from 'mysql'
import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeLoadEquipByMenuController } from '../factories/controllers/load-equipment-by-menu/load-equip-by-menu-factory'
import { makeLoadEquipByCompanyIdController } from '../factories/controllers/load-equip-by-company-id/load-equip-by-company-id-factory'
import { makeLoadEquipByIdController } from '../factories/controllers/load-equip-by-id/load-equip-by-id-factory'
import { makeAddEquipmentController } from '../factories/controllers/add-equipment/add-equipment-controller-factory'
import { makeUpdateEquipmentController } from '../factories/controllers/update-equipment/update-equipment-controller-factory'
import { makeDeleteEquipmentController } from '../factories/controllers/delete-equipment/delete-equipment-controller-factory'
import { makeCountEquipmentController } from '../factories/controllers/count-equipment/count-equipment-controller-factory'
import { makeLoadHasUpdateEquipController } from '../factories/controllers/load-has-update-equip/load-has-update-equip-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))
  router.get('/equipment/count', auth, adptRoute(makeCountEquipmentController(pool)))
  router.get('/equipment/SentMenu/:idMenu', auth, adptRoute(makeLoadEquipByMenuController(pool)))
  router.get('/user/:userId/privilege/:userPrivilegeUser/equipment/:companyId/company', auth, adptRoute(makeLoadEquipByCompanyIdController(pool)))
  router.get('/equipment/:id', auth, adptRoute(makeLoadEquipByIdController(pool)))
  router.get('/linux-equipments/hasUpdate/:idEquip/:iokPin', adptRoute(makeLoadHasUpdateEquipController(pool)))
  router.post('/linux-equipments/create-new-linux/:pin', adptRoute(makeAddEquipmentController(pool)))
  router.put('/equipment/:id', auth, adptRoute(makeUpdateEquipmentController(pool)))
  router.delete('/equipment/:id', auth, adptRoute(makeDeleteEquipmentController(pool)))
}
