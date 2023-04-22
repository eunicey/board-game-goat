import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'

const router = Router()

router.get('/', function (req, res) {
  res.render('index', { title: 'Home Page' })
})

// router.get('/', function (req, res) {
//   res.render('games/index', { title: 'Games Index' })
// })

export {
  router
}
