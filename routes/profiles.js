import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

// GET localhost:3000/profiles
// router.get('/', isLoggedIn, profilesCtrl.index)

//GET localhost:3000/profiles
router.get('/', isLoggedIn, profilesCtrl.show)

//POST localhost:3000/profiles/:gameId/favorites
router.post('/:gameId/favorites', isLoggedIn, profilesCtrl.addToFavorites)

//DELETE localhost:3000/profiles/favorites/:favoriteId
router.delete('/favorites/:favoriteId', isLoggedIn, profilesCtrl.removeFromFavorites)

export {
  router
}