import mongoose from 'mongoose'
import { reviewSchema } from './game.js'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  favorites:[{ type: Schema.Types.ObjectId, ref: 'Game' }],
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  reviews: [reviewSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
