import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

// GET localhost:3000/profiles
router.get('/', isLoggedIn, profilesCtrl.index)

//GET localhost:3000/profiles
router.get('/:profileId', isLoggedIn, profilesCtrl.show)

//POST localhost:3000/profiles/games/:gameId
router.post('/:profileId/games/:gameId', isLoggedIn, profilesCtrl.addToFavorites)

//DELETE localhost:3000/profiles/:profileId/games/:gameId
router.delete('/:profileId/games/:gameId', isLoggedIn, profilesCtrl.removeFromFavorites)

export {
  router
}