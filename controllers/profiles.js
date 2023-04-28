import { Profile } from '../models/profile.js'
import { Game } from '../models/game.js'


// A STRETCH GOAL IS TO RENDER A PROFILES INDEX PAGE. THIS IS PLACEHOLDER CODE
// function index(req, res) {
//   Profile.findById(req.user.profile._id)
//   .then((profile) => {
//     res.redirect(`/profiles/${profile._id}`)
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/')
//   })
// }

function showFavorites (req, res){
  Profile.findById(req.params.profileId)
  .populate('favorites')
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    const favGames = profile.favorites
    res.render('profiles/showFavorites', {
      title: `${profile.name}'s Favorites`,
      profile,
      favGames,
      isSelf,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToFavorites (req, res){
  Game.findById(req.params.favoriteId)
  .then(game => {
    Profile.findById(req.params.profileId)
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
  console.log(req.headers.referer, "<---- ORIGINAL URL")
  Profile.findById(req.params.profileId)
  .populate('favorites')
  .then(profile => {
    profile.favorites.remove({_id: req.params.favoriteId})
    profile.save()
    .then(() => {
      if (req.headers.referer.match('/games/')){
        res.redirect(`/games/${req.params.favoriteId}`)
      } else {
        res.redirect(`/profiles/${profile._id}/favorites`)
      }
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
  showFavorites,
  addToFavorites,
  removeFromFavorites,
}