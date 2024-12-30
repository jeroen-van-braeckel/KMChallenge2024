const participants =[{ name: 'Jappe', values: [ 17.418, 271.9129, 2424.835 ] }, { name: 'Tommy', values: [ 2.45, 283.5649, 2675.552 ] }, { name: 'Rob', values: [ 29.05, 21.3552, 2073.26 ] }, { name: 'Jury Sam', values: [ 8.31, 0, 738.109 ] }, { name: 'Jacky', values: [ 0, 3.1911, 1286.636 ] },{ name: 'Douti', values: [ 338.938, 819.955, 2175.017 ] }, { name: 'Bronny', values: [ 17.741, 83.6036, 3187.775 ] }, { name: 'Ja', values: [ 19.648, 156.5083, 1765.958 ] }];
//Bronny -15.6

function animateBars() {
  const bars = document.querySelectorAll(".bar");
  let delay = 0; // Initial delay

  bars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.dataset.width;
      bar.style.transition = "width 1s"; // Adjust the duration here (e.g., 1s for 1 second)
      bar.style.width = width;

      // Animate the total score
      const totalScore = bar.querySelector(".total-score");
      const total = parseFloat(totalScore.textContent);
      let count = 0;
      const interval = 1000 / total; // Adjust the interval for smoother counting
      totalScore.style.visibility = "visible"; // Show the total score

      const timer = setInterval(() => {
        totalScore.textContent = count.toFixed(2);
        count += total / 100; // Adjust the step size for smoother counting
        if (count >= total) {
          clearInterval(timer);
          totalScore.textContent = total.toFixed(2);
        }
      }, interval);
    }, delay);

    // Increase delay for the next bar
    delay += 1000; // Adjust the delay (e.g., 1000 milliseconds for 1 second)
  });
}

// Call the function to animate bars when the page loads
window.onload = animateBars;

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
    barDiv.dataset.width = `${(value / maxTotal) * 80}%`; // Store width as data attribute

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
