// controllers/api/user-routes.js
const router = require("express").Router();
const { User } = require("../../models");
const multer = require("multer");
const path = require("path");
const withAuth = require("../../public/utils/auth.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

router.put("/update", withAuth, async (req, res) => {
  try {
    const { username, email, password, profilePicture } = req.body;

    const updateData = { username, email, profilePicture };
    if (password) {
      updateData.password = password;
    }

    await User.update(updateData, {
      where: { id: req.session.user_id },
    });

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

router.delete("/delete", withAuth, async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.session.user_id },
    });

    req.session.destroy(() => {
      res.json({ message: "Account deleted successfully" });
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete account" });
  }
});

router.post("/signout", withAuth, (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Signed out successfully" });
  });
});

module.exports = router;
