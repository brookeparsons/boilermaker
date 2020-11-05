const router = require("express").Router();
// const user = require("./user");
// const auth = require("./auth");

router.use("/auth/google", require("./auth"));
router.use("/user", require("./user"));

//router.use('/users', require('./users'));
router.use(function (req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
