const User = require("../db/models/user");

const router = require("express").Router();

// PUT /API/LOGIN
router.put("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) res.status(401).send("User not found");
    else if (!user.hasMatchingPassword(req.body.password))
      res.status(401).send("Incorrect password");
    else {
      req.login(user, (err) => {
        if (err) next(err);
        else res.json(user);
      });
    }
  } catch (error) {
    next(error);
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
  });
});

//POST SIGNUP /API/SIGNUP ... set as user on session?
router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const userLogin = req.login(user);

    if (userLogin) res.json(user);
    else res.status(401).send("unable to login user after signup");
  } catch (error) {
    next(error);
  }
});

// DELETE /api/logout
router.delete("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

// GET /api/me
router.get("/me", (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
