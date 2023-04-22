import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// router.get('/', function (req, res) {
//   res.render('games/index', { title: 'Games Index' })
// })

// GET localhost:3000/games/new
router.get('/new', isLoggedIn, gamesCtrl.new)

// GET localhost:3000/games
router.post('/',  isLoggedIn, gamesCtrl.create)


export {
  router
}