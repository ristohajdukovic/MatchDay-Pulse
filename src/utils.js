// Create a unique ID for a match
function createMatchId(match) {
  const date = match.dateVenue || "nodate";
  const homeName = match.homeTeam?.name || "unknown";
  const awayName = match.awayTeam?.name || "unknown";
  const home = homeName.toLowerCase().replace(/ /g, "-");
  const away = awayName.toLowerCase().replace(/ /g, "-");
  return date + "_" + home + "_" + away;
}

// Check if date is today
function isToday(year, month, day) {
  const now = new Date();
  return (
    now.getFullYear() === year &&
    now.getMonth() === month &&
    now.getDate() === day
  );
}

// Handle hamburger toggle
function setupNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const appNav = document.getElementById("app-nav");
  if (navToggle && appNav) {
    navToggle.addEventListener("click", () => {
      appNav.classList.toggle("open");
    });
  }
}

// Helper: safely parse JSON
function safeParseJSON(jsonString, fallback = []) {
  try {
    return JSON.parse(jsonString);
  } catch {
    console.warn("Invalid JSON detected");
    return fallback;
  }
}

// Helper: trim seconds from time
function formatTimeHHMM(timeString) {
  if (!timeString) return "-";
  return timeString.substring(0, 5);
}