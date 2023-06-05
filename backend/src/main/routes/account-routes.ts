import { Router } from 'express'
import { makeSignUpController } from '../factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'
import { adptRoute } from '../adapters/express-route-adapter'
import { Pool } from 'mysql'
import { makeLoadUserDataController } from '../factories/controllers/load-user-data/load-user-data-factory'
import { adptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeActivateUserController } from '../factories/controllers/activate-account/activate-user-factory'
import { makeEditUserDataController } from '../factories/controllers/update-user-data/update-user-data-controller-factory'
import { makeAuthenticationPasswordController } from '../factories/controllers/authentication-password/authentication-password-controller-factory'
import { makeSendEmailResetPasswordController } from '../factories/controllers/send-email-reset-password/signup-controller-factory'
import { makeUpdateConfigsController } from '../factories/controllers/update-configs/update-configs-controller-factory'
import { makeLoadUserByCompanyController } from '../factories/controllers/load-user-by-company/load-user-by-company-factory'
import { makeDeleteUserController } from '../factories/controllers/delete-user/delete-user-factory'
import { makeAddUserController } from '../factories/controllers/add-user/add-user-controller-factory'
import { makeEditUserByAdmController } from '../factories/controllers/update-user-by-adm/update-user-by-adm-controller-factory'
import { makeLoadUserByEmailDataController } from '../factories/controllers/load-user-by-email/load-user-by-email-factory'
import { makeLoadUserByCorporateNameDataController } from '../factories/controllers/load-user-by-corporateName/load-user-by-corporateName-factory'

export default (router: Router, pool: Pool) => {
  const auth = adptMiddleware(makeAuthMiddleware(pool))

  router.post('/signup', adptRoute(makeSignUpController(pool)))
  router.post('/login', adptRoute(makeLoginController(pool)))
  router.post('/resetPassword/sendEmail', adptRoute(makeSendEmailResetPasswordController(pool)))
  router.post('/authenticationPassword', auth, adptRoute(makeAuthenticationPasswordController(pool)))
  router.get('/loadUser', auth, adptRoute(makeLoadUserDataController(pool)))
  router.put('/activate', adptRoute(makeActivateUserController(pool)))
  router.put('/editUser', auth, adptRoute(makeEditUserDataController(pool)))
  router.put('/editUser/resetPassword', adptRoute(makeEditUserDataController(pool)))
  router.put('/configUser/:id', auth, adptRoute(makeUpdateConfigsController(pool)))
  router.get('/company/:id/user', auth, adptRoute(makeLoadUserByCompanyController(pool)))
  router.delete('/user/:id', auth, adptRoute(makeDeleteUserController(pool)))
  router.post('/user', auth, adptRoute(makeAddUserController(pool)))
  router.put('/user/:id', auth, adptRoute(makeEditUserByAdmController(pool)))
  router.get('/loadUser/:email', adptRoute(makeLoadUserByEmailDataController(pool)))
  router.get('/load/user/:corporateName', adptRoute(makeLoadUserByCorporateNameDataController(pool)))
}
