import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export const HouseSchema = new Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  address: {type: String, required: false},
  imgUrl: {type: String, required: false},
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }

}, { timestamps: true, toJSON: { virtuals: true } })


HouseSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})