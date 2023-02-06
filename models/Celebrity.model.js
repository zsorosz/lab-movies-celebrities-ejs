const { Schema, model } = require("mongoose");

const Celebrity = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const CelebrityModel = model("celebrity", Celebrity);
module.exports = CelebrityModel;
