import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

// GET localhost:3000/profiles
// router.get('/', isLoggedIn, profilesCtrl.index)

//GET localhost:3000/profiles
router.get('/', isLoggedIn, profilesCtrl.show)

// GET localhost:3000/profiles/:whateverId
// router.get('/:whateverId', isLoggedIn, profilesCtrl.show)

export {
  router
}