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
    const isSelf = profile._id.equals(req.user.profile._id)
    const games = profile.favorites
    res.render('profiles/show', {
      title: `${profile.name}'s profile`,
      profile,
      games,
      isSelf,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToFavorites (req, res){
  Game.findById(req.params.gameId)
  .then(game => {
    Profile.findById(req.user.profile._id)
    .populate('favorites')
    .then(profile => {
      profile.favorites.push(game._id)
      profile.save()
      .then(() => {
        res.redirect(`/games/${game._id}`)
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

function removeFromFavorites (req, res){
  Profile.findById(req.user.profile._id)
  .populate('favorites')
  .then(profile => {
    profile.favorites.remove({_id: req.params.gameId})
    profile.save()
    .then(() => {
      res.redirect('/profiles')
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
  addToFavorites,
  removeFromFavorites,
}