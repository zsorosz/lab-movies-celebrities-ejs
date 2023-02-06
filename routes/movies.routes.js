const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

const router = require("express").Router();

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await MovieModel.find().populate("cast");
    res.render("movies/movies", { allMovies });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

router.get("/create", async (req, res) => {
  const allCelebs = await CelebrityModel.find();
  res.render("movies/new-movie", { allCelebs });
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

router.get("/:id/edit", async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.id);
    const allCelebs = await CelebrityModel.find();
    console.log(allCelebs);
    res.render("movies/edit-movie", { movie, allCelebs });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

router.post("/:id", async (req, res) => {
  try {
    await MovieModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/movies/${req.params.id}`);
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
