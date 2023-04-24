import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: "🐐"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show (req, res){
  // Profile.findById(req.params.whateverId)
  Profile.findById(req.user.profile._id)
  .then(profile => {
    res.render('profiles/show', {
      title: `${profile.name}'s profile`,
      profile,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}
export {
  index,
  show,
}