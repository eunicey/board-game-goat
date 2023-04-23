import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, 
    default: 3,
  },
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
})

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: String,
  category: {
    type: String,
    enum: ['Co-Op', 'Engine Builder', 'Deck Builder', 'Worker Placement', 'Social Deduction', 'RPG'],
    default: 'Co-Op',
  },
  duration: {
    type: String,
    enum: ['< 30 min', '1 - 1.5 hrs', '2+ hrs'],
    default: '1 - 1.5 hrs',
  },
  minPlayers: {
    type: Number,
    min: 1,
    default: 1,
  },
  maxPlayers: {
    type: Number,
    min: 1,
    default: 4,
  },
  complexity: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },
  strategy: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },
  luck: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
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
