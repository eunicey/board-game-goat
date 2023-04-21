import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'

const router = Router()

// router.get('/', function (req, res) {
  // res.render('index', { title: 'Home Page' })
// })

router.get('/', gamesCtrl.index)

export {
  router
}
