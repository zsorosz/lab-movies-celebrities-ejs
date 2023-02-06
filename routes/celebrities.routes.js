const CelebrityModel = require("../models/Celebrity.model");

const router = require("express").Router();

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const allCelebs = await CelebrityModel.find();
    console.log(allCelebs);
    res.render("celebrities/celebrities", { allCelebs });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
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
