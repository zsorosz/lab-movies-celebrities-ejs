const MovieModel = require("../models/Movie.model");

const router = require("express").Router();

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await MovieModel.find();
    console.log(allMovies);
    res.render("movies/movies", { allMovies });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

router.get("/create", (req, res) => {
  res.render("movies/new-movie");
});

router.post("/create", async (req, res) => {
  const newMovie = req.body;
  await MovieModel.create(newMovie);
  res.redirect("/movies");
});

module.exports = router;
