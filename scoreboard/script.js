const participants =[{ name: 'Jappe', values: [ 16.419, 261.3735, 1969.373 ] }, { name: 'Tommy', values: [ 2.45, 272.0184, 2164.197 ] }, { name: 'Douti', values: [ 262.139, 717.0256, 1671.091 ] }, { name: 'Rob', values: [ 27.95, 21.3552, 1926.121 ] }, { name: 'Jury Sam', values: [ 8.311, 0, 592.414 ] }, { name: 'Jacky', values: [ 0, 3.1911, 1125.695 ] }, { name: 'Bronny', values: [ 17.742, 83.6035, 2573.709 ] }, { name: 'Ja', values: [ 19.648, 86.7057, 1386.651 ] }]; 


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
