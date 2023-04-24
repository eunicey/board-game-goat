import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.redirect('/games')
})

export {
  router
}
