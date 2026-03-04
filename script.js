
document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('scheduleContainer');
  const searchInput = document.getElementById('searchInput');

  let talks = [];

  fetch('talks.json')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
    });

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTalks = talks.filter(talk => 
      talk.categories.some(category => category.toLowerCase().includes(searchTerm))
    );
    renderSchedule(filteredTalks);
  });

  function renderSchedule(talksToRender) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date('2026-03-04T10:00:00');

    talksToRender.forEach((talk, index) => {
      const startTime = new Date(currentTime);
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

      const talkElement = createTalkElement(talk, startTime, endTime);
      scheduleContainer.appendChild(talkElement);

      currentTime = new Date(endTime.getTime() + 10 * 60 * 1000);

      if (index === 2) {
        const lunchBreakElement = createBreakElement('Lunch Break', currentTime, new Date(currentTime.getTime() + 60 * 60 * 1000));
        scheduleContainer.appendChild(lunchBreakElement);
        currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
      }
    });
  }

  function createTalkElement(talk, startTime, endTime) {
    const talkElement = document.createElement('div');
    talkElement.classList.add('talk');

    const timeString = `${formatTime(startTime)} - ${formatTime(endTime)}`;

    talkElement.innerHTML = `
      <div class="talk-time">${timeString}</div>
      <h2 class="talk-title">${talk.title}</h2>
      <div class="talk-speakers">${talk.speakers.join(', ')}</div>
      <p class="talk-description">${talk.description}</p>
      <div class="talk-categories">
        ${talk.categories.map(cat => `<span>${cat}</span>`).join('')}
      </div>
    `;

    return talkElement;
  }
  
  function createBreakElement(title, startTime, endTime) {
    const breakElement = document.createElement('div');
    breakElement.classList.add('break');
    const timeString = `${formatTime(startTime)} - ${formatTime(endTime)}`;
    breakElement.innerHTML = `<div class="talk-time">${timeString}</div><div>${title}</div>`;
    return breakElement;
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
});
