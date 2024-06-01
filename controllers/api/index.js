const router = require("express").Router();
const userRoutes = require("./user-routes");
const problemRoutes = require("./problem-routes");
const codeRoutes = require("./code-routes");
const commentRoutes = require("./comment-routes");
const leaderboardRoutes = require("./leaderboard-routes");


router.use("/users", userRoutes);
router.use("/problems", problemRoutes);
router.use("/code", codeRoutes);
router.use("/comments", commentRoutes);
router.use("/leaderboard", leaderboardRoutes);


module.exports = router;
