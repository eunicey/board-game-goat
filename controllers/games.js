import { Game } from "../models/game.js"

function index(req, res){
  Game.find({})
  .sort('avgRating')
  .then(games => {
    res.render('games/index', {
      games,
      title: "Top Ten Board Games",
    })
  })
}

function newGame(req, res){
  const newGame = new Game()
  const thisYear = newGame.year

  res.render('games/new', {
    title: 'Add Board Game',
    thisYear,
  })
}

function create (req, res){
  req.body.owner = req.user.profile._id
  req.body.online = !!req.body.online
  Game.create(req.body)
  .then(game => {
    res.redirect('/games')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show (req, res){
  Game.findById(req.params.gameId)
  .populate('owner')
  .then(game => {
    res.render('games/show',{
      game,
      title: game.name,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit (req, res){
  Game.findById(req.params.gameId)
  .then(game => {
    res.render('games/edit', {
      game,
      title: `Edit ${game.name}`,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update (req, res){
  Game.findById(req.params.gameId)
  .then(game =>{
    if (game.owner.equals(req.user.profile._id)){
      req.body.online = !!req.body.online
      game.updateOne(req.body)
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
    } else {
    // ADD ERROR MESSAGE: YOU ARE NOT AUTHORIZED TO EDIT THIS GAME
    }
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
  show,
  edit,
  update,
}