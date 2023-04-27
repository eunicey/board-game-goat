import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, 
    default: 1,
  },
  author: { type: Schema.Types.ObjectId, ref: 'Profile' },
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
})

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    default: "https://openseauserdata.com/files/bb15c0a9f522ea55b10a8a9675f285c4.gif",
  },
  
  description: String,
  category: [],
  duration: String,

  minPlayers: {
    type: Number,
    min: 1,
  },
  maxPlayers: {
    type: Number,
    min: 1,
  },
  complexity: {
    type: Number,
    min: 1,
    max: 5,
  },
  strategy: {
    type: Number,
    min: 1,
    max: 5,
  },
  luck: {
    type: Number,
    min: 1,
    max: 5,
  },
  year: {
    type: Number,
    default: function(){
      return new Date().getFullYear()
    },
  },
  totReviews: {
    type: Number,
    default: 0,
  },

  avgRating: Number,
  online: Boolean,
  reviews: [reviewSchema],
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game,
  reviewSchema
}
