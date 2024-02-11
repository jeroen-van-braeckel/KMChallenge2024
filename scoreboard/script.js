// Sample data (replace with your own values)

const participants = [{ name: 'Jappe', values: [ 3.5, 38.4092, 348.775 ] }, { name: 'Tommy', values: [ 0, 2.2549, 426.405 ] }, { name: 'Douti', values: [ 22.7, 33.2034, 260.276 ] }, { name: 'Rob', values: [ 0, 0, 366.346 ] }, { name: 'Jury Sam', values: [ 0, 0, 18.689 ] }, { name: 'Jacky', values: [ 0, 0, 194.021 ] }, { name: 'Bronny', values: [ 8.021, 33.1529, 322.462 ] }, { name: 'Ja', values: [ 0, 0, 238.471 ] }];
function toggleGifPopup() {
  var gifPopup = document.getElementById("gifPopup");
  var stefanieGif = document.querySelector(".stefanie");

  // Toggle the display state
  if (stefanieGif.style.display === "none") {
    stefanieGif.style.display = "block";
    gifPopup.style.display = "block";
  } else {
    stefanieGif.style.display = "none";
    gifPopup.style.display = "none";
  }
}

// Call the function every 500 milliseconds (0.5 seconds)
setInterval(toggleGifPopup, 3000);

// Find the maximum total score to scale bars proportionally
const maxTotal = Math.max(
  ...participants.map((participant) =>
    participant.values.reduce((sum, value) => sum + value, 0)
  )
);

// Create and append horizontal histogram bars to the scoreboard
const scoreboard = document.getElementById("scoreboard");

participants.forEach((participant) => {
  const total = participant.values.reduce((sum, value) => sum + value, 0);

  const participantDiv = document.createElement("div");
  participantDiv.className = "participant";

  const participantInfoDiv = document.createElement("div");
  participantInfoDiv.className = "participant-info";

  const nameDiv = document.createElement("div");
  nameDiv.className = "participant-name";
  nameDiv.textContent = participant.name;

  participantInfoDiv.appendChild(nameDiv);

  const histogramDiv = document.createElement("div");
  histogramDiv.className = "histogram";

  participant.values.forEach((value, index) => {
    const barDiv = document.createElement("div");
    barDiv.className = `bar subscore${index + 1}`;
    barDiv.style.width = `${(value / maxTotal) * 80}%`; // Adjusted width for proportional bars

    const iconSpan = document.createElement("span");
    iconSpan.className = "icon";

    // Use Unicode characters for swimming, biking, and running icons
    switch (index) {
      case 0:
        iconSpan.textContent = "🏊"; // Swimming icon
        break;
      case 1:
        iconSpan.textContent = "🚴"; // Biking icon
        break;
      case 2:
        iconSpan.textContent = "🏃"; // Running icon
        break;
      default:
        break;
    }

    barDiv.appendChild(iconSpan);
    histogramDiv.appendChild(barDiv);

    // Display the total score at the end of the bar
    if (index === participant.values.length - 1) {
      const totalScoreSpan = document.createElement("span");
      totalScoreSpan.className = "total-score";
      totalScoreSpan.textContent = Math.round(total * 100) / 100;

      barDiv.style.position = "relative"; // Set position to relative for proper positioning
      totalScoreSpan.style.position = "absolute";
      totalScoreSpan.style.left = "100%"; // Align to the right edge of the bar
      totalScoreSpan.style.transform = "translateX(5px)"; // Adjust spacing

      barDiv.appendChild(totalScoreSpan);
    }
  });

  const barContainer = document.createElement("div");
  barContainer.className = "bar-container";
  barContainer.appendChild(histogramDiv);

  participantInfoDiv.appendChild(barContainer);
  participantDiv.appendChild(participantInfoDiv);
  scoreboard.appendChild(participantDiv);
});
