import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

// A STRETCH GOAL IS TO RENDER A PROFILES INDEX PAGE. THIS IS PLACEHOLDER CODE
// GET localhost:3000/profiles
// router.get('/', isLoggedIn, profilesCtrl.index)

//GET localhost:3000/profiles/:profileId/favorites
router.get('/:profileId/favorites', isLoggedIn, profilesCtrl.showFavorites)

//POST localhost:3000/profiles/:profileId/favorites/:favoriteId
router.post('/:profileId/favorites/:favoriteId', isLoggedIn, profilesCtrl.addToFavorites)

//DELETE localhost:3000/profiles/:profileId/favorites/:favoriteId
router.delete('/:profileId/favorites/:favoriteId', isLoggedIn, profilesCtrl.removeFromFavorites)

export {
  router
}