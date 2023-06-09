import { Game } from "../models/game.js"
import { Profile } from '../models/profile.js'

// Pass in variable options for show and edit views 
const categoryOptions = ['Co-Op', 'Engine Builder', 'Deck Builder', 'Worker Placement', 'Social Deduction', 'RPG']
const durationOptions = ['< 30 min', '1 - 1.5 hrs', '2+ hrs']

// Average ratings for game after a user has added or updated their rating
function averageRatings (reviews) {
  return reviews.length ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) : 0
}

function index(req, res){
  Game.find({})
  .sort('-avgRating')

  .then(games => {
    res.render('games/index', {
      games,
      title: "Top Rated Board Games",
    })
  })

  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newGame(req, res){
  const newGame = new Game()
  const thisYear = newGame.year
  res.render('games/new', {
    title: 'Add Board Game',
    thisYear,
    categoryOptions,
    durationOptions,
  })
}

function create (req, res){
  req.body.owner = req.user.profile._id
  !req.body.imgUrl ? delete req.body.imgUrl : 0
  req.body.online = !!req.body.online
  Game.create(req.body)

  .then(() => {
    res.redirect('/games')
  })

  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show (req, res){
  Game.findById(req.params.gameId)
  .populate([
    {path: "owner"},
    {path: "reviews.author"}
  ])

  .then(game => {
    let isUserFav = false
    if (req.hasOwnProperty('user')) {
      Profile.findById(req.user.profile._id)
      .populate('favorites')

      .then(profile => {
        profile.favorites.forEach(function(fav){
          if(fav._id.equals(game._id)){
            isUserFav=true
          }
        })
        res.render('games/show',{
          game,
          title: game.name,
          isUserFav,
          profile,
        })
      })

      .catch(err => {
        console.log(err)
        res.redirect('/')
      })

    } else {
      res.render('games/show',{
        game,
        title: game.name,
        isUserFav,
      })
    }
  })

  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit (req, res){
  Game.findById(req.params.gameId)

  .then(game => {
    if (game.owner.equals(req.user.profile._id)){
      const otherCategories = categoryOptions.filter(category => category !== game.category)
      const otherDurations = durationOptions.filter(duration => duration !== game.duration)
      res.render('games/edit', {
        game,
        title: `Edit ${game.name}`,
        otherCategories,
        otherDurations,
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
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
      !req.body.imgUrl ? delete req.body.imgUrl : 0
      game.updateOne(req.body)

      .then(() => {
        res.redirect(`/games/${game._id}`)
      })

      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })

  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteGame(req, res){
  Game.findById(req.params.gameId)

  .then(game =>{
    if (game.owner.equals(req.user.profile._id)){
      game.deleteOne()
      res.redirect('/games')
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })

  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createReview(req, res){
  Game.findById(req.params.gameId)

  .then(game => {
    req.body.author = req.user.profile._id
    game.reviews.push(req.body)
    game.avgRating = averageRatings(game.reviews)
    game.totReviews = game.reviews.length
    game.save()

    .then(()=> {
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
}

function editReview (req, res){
  Game.findById(req.params.gameId)

  .then(game => {
    const review = game.reviews.id(req.params.reviewId)
    if (review.author.equals(req.user.profile._id)){
      res.render('games/editComment',{
        game,
        review,
        title: 'Edit Review',
      })
    } else {
      throw new Error('🚫 YOU ARE NOT AUTHORIZED TO EDIT THIS COMMENT 🚫')
    }
  })

  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function updateReview (req, res){
  Game.findById(req.params.gameId)

  .then(game => {
    const review = game.reviews.id(req.params.reviewId)
    if (review.author.equals(req.user.profile._id)){
      review.set(req.body)
      game.avgRating = averageRatings(game.reviews)
      game.save()

      .then(()=> {
        res.redirect(`/games/${game._id}`)
      })

      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
    } else {
      throw new Error('🚫 YOU ARE NOT AUTHORIZED TO EDIT THIS COMMENT 🚫')
    }
  })

  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteReview (req, res){
  Game.findById(req.params.gameId)

  .then (game => {
    const review = game.reviews.id(req.params.reviewId)
    if (review.author.equals (req.user.profile._id)){
      game.reviews.remove(review)
      game.totReviews = game.reviews.length
      game.avgRating = averageRatings(game.reviews)
      game.save()

      .then(() => {
        res.redirect(`/games/${game._id}`)  
      })

      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
    } else {
      throw new Error('🚫 YOU ARE NOT AUTHORIZED TO DELETE THIS COMMENT 🚫')
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
  deleteGame as delete,
  createReview,
  editReview,
  updateReview,
  deleteReview,
}