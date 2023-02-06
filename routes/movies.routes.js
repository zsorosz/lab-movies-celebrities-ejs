const MovieModel = require("../models/Movie.model");

const router = require("express").Router();

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await MovieModel.find();
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

router.get("/:id", async (req, res) => {
  try {
    const foundMovie = await MovieModel.findById(req.params.id).populate(
      "cast"
    );
    res.render("movies/movie-details", { foundMovie });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

router.post("/:id/delete", async (req, res) => {
  try {
    console.log(req.params.id);
    await MovieModel.findByIdAndRemove(req.params.id);
    res.redirect("/movies");
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

module.exports = router;
