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
  res.redirect("/celebrities");
});

router.get("/:id/edit", async (req, res) => {
  try {
    const celeb = await CelebrityModel.findById(req.params.id);
    res.render("celebrities/edit-celebrity", { celeb });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const foundCeleb = await CelebrityModel.findById(req.params.id);
    res.render("celebrities/celebrity-details", { foundCeleb });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

router.post("/:id", async (req, res) => {
  try {
    await CelebrityModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/celebrities/${req.params.id}`);
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

router.post("/:id/delete", async (req, res) => {
  try {
    await CelebrityModel.findByIdAndRemove(req.params.id);
    res.redirect("/celebrities");
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

module.exports = router;
