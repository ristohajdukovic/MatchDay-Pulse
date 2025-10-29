
let currentMonth;
let currentYear;
let matches = [];

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();

  renderCalendar(currentYear, currentMonth);
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

    if (isToday(year, month, day)) {
      box.classList.add("today");
    }

    calendar.appendChild(box);
  }
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

function loadMatches() {
  fetch("./matches.json")
    .then(response => response.json())
    .then(json => {
      matches = json.data;
      console.log("Loaded matches!");
    })
    .catch(error => {
      console.log("Oops something went wrong");
    });
}

// LOAD MATCHES
function loadMatches() {
  fetch("./matches.json")
    .then(response => response.json())
    .then(json => {
      matches = json.data;
      console.log("Loaded matches from file");
    })
    .catch(error => {
      console.log("Error loading matches");
    });
}