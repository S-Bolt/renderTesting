const router = require("express").Router();
const userRoutes = require("./user-routes");
// const problemRoutes = require("./problem-routes");
// const codeRoutes = require("./code-routes");

router.use("/users", userRoutes);
// router.use("/problems", problemRoutes);
// router.use("/code", codeRoutes);

module.exports = router;
