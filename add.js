// COUNTRIES
const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin",
  "Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso",
  "Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Republic","Chile","China",
  "Colombia","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Estonia","Ethiopia","Finland","France","Gabon","Gambia","Georgia",
  "Germany","Ghana","Greece","Guatemala","Guinea","Guyana","Honduras","Hungary","Iceland","India",
  "Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan",
  "Kenya","Kuwait","Kyrgyzstan","Latvia","Lebanon","Libya","Lithuania","Luxembourg","Madagascar",
  "Malaysia","Maldives","Mali","Malta","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro",
  "Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger",
  "Nigeria","North Macedonia","Norway","Oman","Pakistan","Palestine","Panama","Paraguay","Peru",
  "Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saudi Arabia","Senegal",
  "Serbia","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","Sudan",
  "Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Tunisia","Turkey",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Venezuela","Vietnam","Zambia","Zimbabwe"
];

const homeCountry = document.getElementById("homeCountry");
const awayCountry = document.getElementById("awayCountry");

for (let i = 0; i < countries.length; i++) {
  const option1 = document.createElement("option");
  option1.value = countries[i];
  option1.textContent = countries[i];
  homeCountry.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = countries[i];
  option2.textContent = countries[i];
  awayCountry.appendChild(option2);
}

// SHOW RESULT SECTION
const statusSelect = document.getElementById("status");
const resultSection = document.getElementById("resultSection");

statusSelect.addEventListener("change", function() {
  if (statusSelect.value === "played") {
    resultSection.style.display = "block";
  } else {
    resultSection.style.display = "none";
  }
});

// FORM SUBMIT
const form = document.getElementById("addMatchForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const sport = document.getElementById("sport").value;
  const status = document.getElementById("status").value;
  const dateVenue = document.getElementById("dateVenue").value;
  const timeVenueUTC = document.getElementById("timeVenueUTC").value;
  const homeName = document.getElementById("homeName").value;
  const awayName = document.getElementById("awayName").value;
  const competition = document.getElementById("competition").value;
  const stage = document.getElementById("stage").value;
  const stadium = document.getElementById("stadium").value;


  // VALIDATIONS
  if (!sport || !status || !dateVenue || !timeVenueUTC || !homeName || !awayName) {
    alert("Please fill in all required fields.");
    return;
  }


  if (homeName === awayName) {
    alert("Home and away teams cannot be the same.");
    return;
  }

const matchDateTime = new Date(dateVenue + "T" + timeVenueUTC + "Z");
const now = new Date();

if (status === "scheduled" && matchDateTime <= now) {
  alert("Scheduled matches must be set in the future.");
  return;
}

if (status === "played" && matchDateTime > now) {
  alert("Played matches cannot be set in the future.");
  return;
}

// Team names can only have letters, numbers, spaces, and hyphens
const hasInvalidCharacters = function(name) {
  
  for (let i = 0; i < name.length; i++) {
    const char = name[i];
    const isLetter = (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z');
    const isNumber = (char >= '0' && char <= '9');
    const isSpace = char === ' ';
    const isHyphen = char === '-';
    
    if (!isLetter && !isNumber && !isSpace && !isHyphen) {
      return true; 
    }
  }
  return false; 
};

if (hasInvalidCharacters(homeName) || hasInvalidCharacters(awayName)) {
  alert("Team names can only contain letters, numbers, spaces, or hyphens.");
  return;
}

// Check if this exact match already exists
const existingMatches = sessionStorage.getItem("addedMatches");
let savedMatches = [];

if (existingMatches) {
  savedMatches = JSON.parse(existingMatches);
}

let isDuplicate = false;

for (let i = 0; i < savedMatches.length; i++) {
  const existing = savedMatches[i];
  
  const sameDate = existing.dateVenue === dateVenue;
  const sameTime = existing.timeVenueUTC === timeVenueUTC;
  const sameHome = existing.homeTeam.name.toLowerCase() === homeName.toLowerCase();
  const sameAway = existing.awayTeam.name.toLowerCase() === awayName.toLowerCase();
  
  if (sameDate && sameTime && sameHome && sameAway) {
    isDuplicate = true;
    break;
  }
}

if (isDuplicate) {
  alert("This match already exists.");
  return;
}

 
  const newMatch = {
    id: Date.now(),
    season: new Date().getFullYear(),
    status: status,
    sport: sport,
    dateVenue: dateVenue,
    timeVenueUTC: timeVenueUTC,
    originCompetitionName: competition,
    stage: { name: stage },
    homeTeam: {
      name: homeName,
      teamCountryCode: document.getElementById("homeCountry").value
    },
    awayTeam: {
      name: awayName,
      teamCountryCode: document.getElementById("awayCountry").value
    },
    stadium: stadium
  };


  if (status === "played") {
    const homeGoals = document.getElementById("homeGoals").value;
    const awayGoals = document.getElementById("awayGoals").value;

    if (!homeGoals || !awayGoals) {
      alert("Please enter goals for both teams.");
      return;
    }

    const homeScore = parseInt(homeGoals);
    const awayScore = parseInt(awayGoals);

    newMatch.result = {
      homeGoals: homeScore,
      awayGoals: awayScore,
      winner: homeScore > awayScore ? homeName : awayScore > homeScore ? awayName : "Draw"
    };
  }

  // Save to runtime storage
  let matches = sessionStorage.getItem("addedMatches");
  if (matches) {
    matches = JSON.parse(matches);
  } else {
    matches = [];
  }
  
  matches.push(newMatch);
  sessionStorage.setItem("addedMatches", JSON.stringify(matches));

  alert("Match added!");
  window.location.href = "index.html";
});