import { Game } from "../models/game.js"

function index(req, res){
  res.render('games/index', {
    title: "Top Ten Board Games"
  })
}

function newGame(req, res){
  const newGame = new Game()
  const thisYear = newGame.year

  res.render('games/new', {
    title: 'Add Board Game',
    thisYear,
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create (req, res){
  Game.create(req.body)
  .then(game => {
    res.redirect('/games')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
  newGame as new,
  create,
}