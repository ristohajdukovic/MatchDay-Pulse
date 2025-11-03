
let currentMonth;
let currentYear;
let matches = [];

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();

  renderCalendar(currentYear, currentMonth)
  bindNavigation();
  loadMatches();
});

// CHANGE MONTH
function bindNavigation() {
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  prevBtn.addEventListener("click", () => changeMonth(-1));
  nextBtn.addEventListener("click", () => changeMonth(1));
}

function changeMonth(offset) {
  currentMonth += offset;

  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  renderCalendar(currentYear, currentMonth);
}

// CALENDAR GRID
function renderCalendar(year, month) {
  const calendar = document.getElementById("calendar");
  const monthLabel = document.getElementById("month-label");
  calendar.innerHTML = "";

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];


  monthLabel.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  
  let startIndex = (firstDay.getDay() + 6) % 7;

  for (let i = 0; i < startIndex; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    calendar.appendChild(empty);
  }

  // add days
  for (let day = 1; day <= daysInMonth; day++) {
    const box = document.createElement("div");
    box.className = "day";
    box.textContent = day;

    let m = month + 1;
    let d = day;
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;
    const dateStr = year + "-" + m + "-" + d;

    const dayMatches = matches.filter(m => m.dateVenue === dateStr);

    if (dayMatches.length > 0) {
    const dotsWrap = document.createElement("div");
    dotsWrap.className = "dots";

    for (let i = 0; i < dayMatches.length; i++) {
    const dot = document.createElement("span");
    dot.className = "dot";
    dotsWrap.appendChild(dot);
  }
  box.appendChild(dotsWrap);

// If this day has matches, show a tooltip

  const firstMatch = dayMatches[0];
  const homeName = firstMatch.homeTeam?.name || "TBD";
  const awayName = firstMatch.awayTeam?.name || "TBD";
  
  const tooltip = document.createElement("div");
  tooltip.className = "tip";
  
  let tooltipText = homeName + " vs " + awayName;
  
  if (dayMatches.length > 1) {
    const additionalMatches = dayMatches.length - 1;
    tooltipText = tooltipText + " +" + additionalMatches;
  }
  
  tooltip.textContent = tooltipText;
  box.appendChild(tooltip);


    box.addEventListener("click", () => {
      openMatchPanel(dayMatches, dateStr);
    });

  }

    if (isToday(year, month, day)) {
      box.classList.add("today");
    }

    calendar.appendChild(box);
  }
}

// PANEL FUNCTIONS

function openMatchPanel(matchesForDay, dateStr) {
  const panel = document.getElementById("match-panel");
  const title = document.getElementById("panel-title");
  const body = document.getElementById("panel-body");

  title.textContent = `Matches on ${dateStr}`;
  body.innerHTML = "";

  matchesForDay.forEach(match => {
    const card = document.createElement("div");
    card.className = "match-card";

    const home = match.homeTeam?.name || "TBD";
    const away = match.awayTeam?.name || "TBD";
    const time = match.timeVenueUTC || "Time N/A";
    const comp = match.originCompetitionName || "Unknown";
    const sport = match.sport || "Football";

    card.innerHTML = `
      <h3>${home} vs ${away}</h3>
      <div class="match-meta">
        <span>${time}</span>
        <span>${comp}</span>
        <span class="match-tag">${sport}</span>
      </div>
    `;

    card.addEventListener("click", () => {
    const matchId = match.id || createMatchId(match);  
    window.location.href = "matchdet.html?id=" + matchId;

  });

    body.appendChild(card);

  });

  panel.classList.add("show");
  panel.classList.remove("hidden");
}

function closeMatchPanel() {
  const panel = document.getElementById("match-panel");
  panel.classList.remove("show");
}


// ===== HELPER =====
function isToday(year, month, day) {
  const now = new Date();
  return (
    now.getFullYear() === year &&
    now.getMonth() === month &&
    now.getDate() === day
  );
}

function createMatchId(match) {
  const date = match.dateVenue || "nodate";
  const homeName = match.homeTeam?.name || "unknown";
  const awayName = match.awayTeam?.name || "unknown";
  
  const home = homeName.toLowerCase().replace(/ /g, "-");
  const away = awayName.toLowerCase().replace(/ /g, "-");
  
  return date + "_" + home + "_" + away;
}

// LOAD MATCHES
function loadMatches() {
  fetch("./matches.json")
    .then(response => response.json())
    .then(json => {
      const baseMatches = json.data;
      const addedMatches = sessionStorage.getItem("addedMatches");

      for (let i = 0; i < baseMatches.length; i++) {
        if (!baseMatches[i].id) {
          baseMatches[i].id = createMatchId(baseMatches[i]);
        }
      }
      
      if (addedMatches) {
        const newMatches = JSON.parse(addedMatches);
        for (let i = 0; i < newMatches.length; i++) {
          baseMatches.push(newMatches[i]);
        }
      }
      
      matches = baseMatches;
      // filteredMatches = baseMatches;


console.log("Loaded", matches.length, "matches");
      
      renderCalendar(currentYear, currentMonth);
    })
    .catch(error => {
      console.log("Error loading matches:", error);
      matches = [];
      filteredMatches = [];
      renderCalendar(currentYear, currentMonth);
    });
}


document.addEventListener("click", (e) => {
  if (e.target.id === "close-panel") {
    closeMatchPanel();
  }

  
});


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMatchPanel();
});

