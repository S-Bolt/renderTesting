const router = require("express").Router();
const { User, UserProblem } = require("../../models");
const multer = require("multer");
const path = require("path");
const withAuth = require("../../public/utils/auth.js");
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const handleError = (res, status, message) => {
  res.status(status).json({ message });
};

router.post("/", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return handleError(
        res,
        400,
        "Email, username, and password are required."
      );
    }

    const userData = await User.create({ email, username, password });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.error("Error creating user:", err);
    handleError(res, 400, err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return handleError(res, 400, "Username and password are required.");
    }

    const userData = await User.findOne({ where: { username } });

    if (!userData) {
      return handleError(
        res,
        400,
        "Incorrect username or password, please try again."
      );
    }

    const validPassword = await userData.checkPassword(password);

    if (!validPassword) {
      return handleError(
        res,
        400,
        "Incorrect username or password, please try again."
      );
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.error("Error logging in:", err);
    handleError(
      res,
      500,
      "An error occurred during login. Please try again later."
    );
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    handleError(res, 404, "No user is logged in.");
  }
});

router.get("/session-status", (req, res) => {
  res.json(req.session);
});

router.get("/current-user", async (req, res) => {
  try {
    if (!req.session.user_id) {
      return handleError(res, 401, "Not logged in.");
    }

    const user = await User.findByPk(req.session.user_id, {
      attributes: ["username", "email", "profilePicture", "points"],
    });

    if (!user) {
      return handleError(res, 404, "User not found.");
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching current user:", err);
    handleError(res, 500, "Failed to fetch current user.");
  }
});

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return handleError(res, 400, "No file uploaded.");
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

router.put("/update", withAuth, async (req, res) => {
  try {
    const { username, email, password, profilePicture } = req.body;

    if (!username && !email && !profilePicture && !password) {
      return handleError(res, 400, "At least one field is required to update.");
    }

    const updateData = { username, email, profilePicture };
    if (password) {
      //hashing new password to store in DB
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    await User.update(updateData, {
      where: { id: req.session.user_id },
    });

    res.json({ message: "Profile updated successfully." });
  } catch (err) {
    console.error("Error updating profile:", err);
    handleError(res, 500, "Failed to update profile.");
  }
});

router.delete("/delete", withAuth, async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.session.user_id },
    });

    req.session.destroy(() => {
      res.json({ message: "Account deleted successfully." });
    });
  } catch (err) {
    console.error("Error deleting account:", err);
    handleError(res, 500, "Failed to delete account.");
  }
});

router.post("/signout", withAuth, (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Signed out successfully." });
  });
});

router.get("/problems/solved", withAuth, async (req, res) => {
  try {
    const solvedProblems = await UserProblem.findAll({
      where: { user_id: req.session.user_id, results: true },
      attributes: ["problem_id"],
    });

    const solvedProblemIds = solvedProblems.map((up) => up.problem_id);

    res.status(200).json(solvedProblemIds);
  } catch (err) {
    console.error("Error fetching solved problems:", err);
    handleError(res, 500, "Failed to fetch solved problems.");
  }
});

// Route to handle Google login/signup
router.post("/google-login", async (req, res) => {
  try {
    const { uid, email, displayName, photoURL } = req.body;
    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        username: displayName,
        email: email,
        googleId: uid,
        profilePicture: photoURL,
        password: "", // Leave password blank or handle it appropriately
      });
    } else {
      user.profilePicture = photoURL;
      await user.save();
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    console.error("Error during Google login/signup:", err);
    res.status(500).json({
      message:
        "An error occurred during Google login/signup. Please try again later.",
    });
  }
});

module.exports = router;
