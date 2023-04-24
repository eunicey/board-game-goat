import { Profile } from '../models/profile.js'
import { Game } from '../models/game.js'

// function index(req, res) {
//   Profile.find({})
//   .then(profiles => {
//     res.render('profiles/index', {
//       profiles,
// 			title: "🐐"
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/')
//   })
// }

function show (req, res){
  Profile.findById(req.user.profile._id)
  .populate('favorites')
  .then(profile => {
    const favorites = profile.favorites
    res.render('profiles/show', {
      title: `${profile.name}'s profile`,
      profile,
      favorites,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToFavList (req, res){
  Game.findById(req.params.gameId)
  .then(game => {
    Profile.findById(req.user.profile._id)
    .populate('favorites')
    .then(profile => {
      profile.favorites.push(game._id)
      profile.save()
      .then(() => {
        res.redirect('/games')
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  // index,
  show,
  addToFavList,
}