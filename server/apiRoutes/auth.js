const router = require("express").Router();
const passport = require("passport");

router.get("/", async (req, res, next) => {
  try {
    const email = req.body.email;
    //redirect to google
    const status = await passport.authenticate("google", { scope: "" });
    status ? res.send(status) : res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

//google configure confirmation
router.get("/callback", (req, res, next) => {
  try {
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/login",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
