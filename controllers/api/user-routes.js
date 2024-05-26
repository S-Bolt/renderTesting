// controllers/api/user-routes.js
const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      res
        .status(400)
        .json({ message: "Email, username, and password are required." });
      return;
    }

    const userData = await User.create({ email, username, password });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log("User created and session saved:", req.session.user_id);

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log("User logged in and session saved:", req.session.user_id);

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  console.log("Logout route called");
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Add this route to check session status
router.get("/session-status", (req, res) => {
  res.json(req.session);
});

router.get("/current-user", async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.status(401).json({ error: "Not logged in" });
    }

    const user = await User.findByPk(req.session.user_id, {
      attributes: ["username", "points"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching current user:", err);
    res.status(500).json({ error: "Failed to fetch current user" });
  }
});

module.exports = router;
