const leaderboardSection = document.querySelector(".rank-board");

let results = localStorage.getItem("results");
if (results) {
  let resultParsed = JSON.parse(results);
  resultParsed.sort((a, b) => b.result - a.result);
  resultParsed.slice(0, 3).map((item) => {
    const playedContainer = document.createElement("div");
    playedContainer.className = "player-container";
    const playedName = document.createElement("p");
    playedName.className = "palyer-name";
    playedName.textContent = item.name;
    const score = document.createElement("p");
    score.className = "score";
    score.textContent = item.result;
    playedContainer.appendChild(playedName);
    playedContainer.appendChild(score);
    leaderboardSection.appendChild(playedContainer);
  });
}
