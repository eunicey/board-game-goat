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

// GET localhost:3000/games/:gameId/edit
router.get('/:gameId/edit', isLoggedIn, gamesCtrl.edit)

// GET localhost:3000/games/:gameId/reviews/:reviewId/edit
router.get('/:gameId/reviews/:reviewId/edit', isLoggedIn, gamesCtrl.editReview)

// PUT localhost:3000/games/:gameId
router.put('/:gameId', isLoggedIn, gamesCtrl.update)

// PUT localhost:3000/games/:gameId/reviews/:reviewId
router.put('/:gameId/reviews/:reviewId', isLoggedIn, gamesCtrl.updateReview)

// POST localhost:3000/games
router.post('/', isLoggedIn, gamesCtrl.create)

// POST localhost:3000/games/:gameId/reviews
router.post('/:gameId/reviews', isLoggedIn, gamesCtrl.createReview)

// DELETE localhost:3000/games/:gameId
router.delete('/:gameId', isLoggedIn, gamesCtrl.delete)

// DELETE localhost:3000/games/:gameId/reviews/:reviewId
router.delete('/:gameId/reviews/:reviewId', isLoggedIn, gamesCtrl.deleteReview)

export {
  router
}