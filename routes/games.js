import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// router.get('/', function (req, res) {
//   res.render('index', { title: 'Home Page' })
// })

// GET localhost:3000/games/new
router.get('/new', gamesCtrl.new)


export {
  router
}