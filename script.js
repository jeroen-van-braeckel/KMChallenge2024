// Sample data (replace with your own values)
const participants = [
  { name: 'Tommy', values: [0, 0, 53] },
  { name: 'Bronny', values: [0, 15, 80] },
  
  { name: 'Tommy', values: [10, 0, 53] },
  { name: 'Bronny', values: [30, 15, 80] },
  
  { name: 'Tommy', values: [90, 0, 53] },
  { name: 'Bronny', values: [26, 15, 80] },
  
  { name: 'Tommy', values: [2, 0, 53] },
  { name: 'Bronny', values: [0, 15, 80] },
];

// Find the maximum total score to scale bars proportionally
const maxTotal = Math.max(...participants.map(participant => participant.values.reduce((sum, value) => sum + value, 0)));

// Create and append horizontal histogram bars to the scoreboard
const scoreboard = document.getElementById('scoreboard');

participants.forEach(participant => {
  const total = participant.values.reduce((sum, value) => sum + value, 0);

  const participantDiv = document.createElement('div');
  participantDiv.className = 'participant';

  const participantInfoDiv = document.createElement('div');
  participantInfoDiv.className = 'participant-info';

  const nameDiv = document.createElement('div');
  nameDiv.className = 'participant-name';
  nameDiv.textContent = participant.name;

  participantInfoDiv.appendChild(nameDiv);

  const histogramDiv = document.createElement('div');
  histogramDiv.className = 'histogram';

  participant.values.forEach((value, index) => {
    const barDiv = document.createElement('div');
    barDiv.className = `bar subscore${index + 1}`;
    barDiv.style.width = `${(value / maxTotal) * 100}%`; // Adjusted width for proportional bars

    const iconSpan = document.createElement('span');
    iconSpan.className = 'icon';

    // Use Unicode characters for swimming, biking, and running icons
    switch (index) {
      case 0:
        iconSpan.textContent = '🏊'; // Swimming icon
        break;
      case 1:
        iconSpan.textContent = '🚴'; // Biking icon
        break;
      case 2:
        iconSpan.textContent = '🏃'; // Running icon
        break;
      default:
        break;
    }

    barDiv.appendChild(iconSpan);
    histogramDiv.appendChild(barDiv);
  });

  const barContainer = document.createElement('div');
  barContainer.className = 'bar-container';
  barContainer.appendChild(histogramDiv);

  participantInfoDiv.appendChild(barContainer);
  participantDiv.appendChild(participantInfoDiv);
  scoreboard.appendChild(participantDiv);
});
