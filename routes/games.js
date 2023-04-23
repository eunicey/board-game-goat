import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/games
router.get('/', gamesCtrl.index)

// GET localhost:3000/games/new
router.get('/new', isLoggedIn, gamesCtrl.new)

// GET localhost:3000/games/:gameId
router.get('/:gameId', gamesCtrl.show)

// POST localhost:3000/games
router.post('/',  isLoggedIn, gamesCtrl.create)


export {
  router
}