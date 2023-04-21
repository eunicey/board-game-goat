import { Game } from "../models/game.js"

function index(req, res){
  res.render('games/index', {
    title: "Top Ten Board Games"
  })
}

export {
  index,
}