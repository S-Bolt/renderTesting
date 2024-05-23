const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

// Route for displaying the homepage
router.get("/", async (req, res) => {
  try {
    let user = null;

    if (req.session.logged_in) {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
      });

      if (userData) {
        user = userData.get({ plain: true });
      }
    }

    res.render("homepage", {
      username: user ? user.username : null,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load homepage" });
  }
});

// Route for displaying the login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Route for displaying the sign-up page
router.get("/signUp", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signUp");
});

module.exports = router;
