const CelebrityModel = require("../models/Celebrity.model");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("celebrities/celebrities");
});

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res) => {
  const newCeleb = req.body;
  await CelebrityModel.create(newCeleb);
  res.render("celebrities");
});

module.exports = router;
