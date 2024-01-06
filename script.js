// Sample data (replace with your own values)
const participants = [
  { name: 'Jappe', values: [30, 20, 10] },
  { name: 'Bronny', values: [25, 15, 5] },
  { name: 'Douti', values: [40, 10, 20] }
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
    histogramDiv.appendChild(barDiv);
  });

  const barContainer = document.createElement('div');
  barContainer.className = 'bar-container';
  barContainer.appendChild(histogramDiv);

  participantInfoDiv.appendChild(barContainer);
  participantDiv.appendChild(participantInfoDiv);
  scoreboard.appendChild(participantDiv);
});