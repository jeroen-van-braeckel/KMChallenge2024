// Sample data (replace with your own values)
const participants = [
  { name: 'Participant 1', values: [30, 20, 10] },
  { name: 'Participant 2', values: [25, 15, 5] },
  { name: 'Participant 3', values: [40, 10, 20] }
];

// Sort participants based on the total of values
participants.sort((a, b) => b.values.reduce((sum, value) => sum + value, 0) - a.values.reduce((sum, value) => sum + value, 0));

// Create and append progress bars to the scoreboard
const scoreboard = document.getElementById('scoreboard');

participants.forEach(participant => {
  const total = participant.values.reduce((sum, value) => sum + value, 0);
  const progressBar = document.createElement('div');
  progressBar.className = 'participant';
  progressBar.innerHTML = `
    <div>${participant.name} - Total: ${total}</div>
    <div class="progressbar">
      <div class="progress" style="width: ${total}%"></div>
    </div>
  `;
  scoreboard.appendChild(progressBar);
});
