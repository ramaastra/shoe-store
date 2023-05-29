const { Router } = require("express");

const shoeRouter = require("./shoe.router");
const authRouter = require("./auth.router");
const categoryRouter = require("./category.router");
const auth = require("../middlewares/auth");

const router = Router();

router.use(authRouter);
router.use(auth);

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.use(shoeRouter);
router.use(categoryRouter);

module.exports = router;
