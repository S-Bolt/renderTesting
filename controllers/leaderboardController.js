const { User } = require("../models");

const getLeaderboard = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["username", "points"],
      order: [["points", "DESC"]],
      limit: 10,
    });
    console.log("Fetched leaderboard data:", users); // Debugging statement
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching leaderboard data:", err);
    res.status(500).json(err);
  }
};

module.exports = { getLeaderboard };
