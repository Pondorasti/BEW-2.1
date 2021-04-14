"use strict"

const mongoose = require("mongoose"),
  Schema = mongoose.Schema

const PetSchema = new Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    birthday: { type: Date, required: true },
    picUrl: { type: String },
    picUrlSq: { type: String },
    avatarUrl: { type: String },
    favoriteFood: { type: String, required: true },
    description: { type: String, required: true, minlength: 140 },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

const mongoosePaginate = require("mongoose-paginate")
mongoosePaginate.paginate.options = {
  limit: 3, // Number of records on each page
}
PetSchema.plugin(mongoosePaginate)

PetSchema.index({ name: "text", species: "text", favoriteFood: "text", description: "text" })

module.exports = mongoose.model("Pet", PetSchema)
