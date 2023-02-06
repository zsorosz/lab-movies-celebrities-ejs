const { Schema, model } = require("mongoose");

const Movie = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: {
    type: [Schema.Types.ObjectId],
    ref: "celebrity",
  },
});

const MovieModel = model("movie", Movie);
module.exports = MovieModel;
