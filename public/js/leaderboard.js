document.addEventListener("DOMContentLoaded", async () => {
  const leaderboardListContent = document.getElementById(
    "leaderboard-list-content"
  );
  const myRankElement = document.getElementById("my-rank");
  const myScoreElement = document.getElementById("my-score");
  const topUserNameElement = document.getElementById("top-user-name");
  const topUserPointsElement = document.getElementById("top-user-points");

  try {
    const leaderboardResponse = await fetch("/api/leaderboard");
    if (!leaderboardResponse.ok) {
      throw new Error(`HTTP error! status: ${leaderboardResponse.status}`);
    }
    const users = await leaderboardResponse.json();

    const currentUserResponse = await fetch("/api/users/current-user");
    if (!currentUserResponse.ok) {
      throw new Error(`HTTP error! status: ${currentUserResponse.status}`);
    }
    const currentUser = await currentUserResponse.json();

    // Sort users by points in descending order
    users.sort((a, b) => b.points - a.points);

    // Find the rank of the current user
    const currentUserRank =
      users.findIndex((user) => user.username === currentUser.username) + 1;

    // Set current user's rank and score
    myRankElement.textContent = `My Rank: ${currentUserRank} PLACE`;
    myScoreElement.textContent = `My Score: ${currentUser.points}`;

    // Set top user details
    const topUser = users[0];
    topUserNameElement.textContent = topUser.username;
    topUserPointsElement.textContent = `Points: ${topUser.points}`;

    // Populate the leaderboard list
    leaderboardListContent.innerHTML = users
      .map(
        (user, index) => `
      <div class="leaderboard-row">
        <div class="leaderboard-list-header-rank ${
          index === 0
            ? "rank-1"
            : index === 1
            ? "rank-2"
            : index === 2
            ? "rank-3"
            : ""
        }">
          ${index + 1} ${
          index === 0
            ? '<div class="rank-img"><img src="/images/rank1.png" alt="Rank 1" class="podium-icon"></div>'
            : index === 1
            ? '<div class="rank-img"><img src="/images/rank2.png" alt="Rank 2" class="podium-icon"></div>'
            : index === 2
            ? '<div class="rank-img"><img src="/images/rank3.png" alt="Rank 3" class="podium-icon"></div>'
            : ""
        }
        </div>
        <div class="leaderboard-list-header-name">${user.username}</div>
        <div class="leaderboard-list-header-points">${user.points}</div>
      </div>
    `
      )
      .join("");
  } catch (err) {
    console.error("Error fetching leaderboard data:", err);
  }
});
