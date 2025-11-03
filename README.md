# MatchDay Pulse

MatchDay Pulse is a dynamic and responsive sports event calendar built as a solution for a frontend coding exercise. The application allows users to view a calendar of sports events, see event details, and add new events in real-time.

This project is built with **plain HTML, CSS, and Vanilla JavaScript**, with no external libraries or frameworks.

## Features

* **Dynamic Monthly Calendar:** A full calendar grid for the current month.
* **Event Indicators:** Days with scheduled events are marked with a dot.
* **Event Tooltips:** Hovering over a day with events shows a quick tooltip with match info.
* **Event Details Panel:** Clicking a day opens a slide-over panel (or a bottom drawer on mobile) listing all matches for that day.
* **Dedicated Detail Page:** Clicking a specific match navigates to a `matchdet.html` page displaying full event details (teams, score, time, stadium).
* **Add New Events:** A separate form (`add.html`) allows users to add new matches.
* **Runtime Storage:** New events are stored in `sessionStorage` and immediately appear on the calendar for the current session.
* **Sport Filtering:** Users can filter the calendar by sport (e.g., Football, Ice Hockey).
* **Fully Responsive:** The layout adapts smoothly from desktop to tablet and mobile devices, including a hamburger menu and responsive filter controls.

##  Tech Stack

* **HTML5:** Semantic HTML for structure and accessibility.
* **CSS3:** Modern CSS for styling.
* **JavaScript (ES6+):** Vanilla JavaScript for all dynamic functionality.
##  Getting Started

This is a static website, but it uses the `fetch` API to load `matches.json`. Due to browser CORS policies, you cannot run it by just double-clicking the `index.html` file.

You must run it from a local web server.

### Option 1: Using the VS Code Live Server (Easiest)

1.  Open the project folder in Visual Studio Code.
2.  Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
3.  Right-click on `index.html` in the file explorer and select "Open with Live Server".

### Option 2: Using Python's built-in server

If you have Python 3 installed, you can use its built-in HTTP server.

1.  Open your terminal or command prompt.
2.  Navigate to the project's root directory (the one containing `index.html`).
3.  Run the following command:

    ```sh
    python -m http.server
    ```

4.  Open your browser and go to `http://localhost:8000`.

## Project Task Checklist

This project successfully fulfills all the requirements of the coding exercise:

* **✅ Task 1: Calendar View:** Implemented a full calendar grid with event markers and tooltips.
* **✅ Task 2: Event Detail Page:** Clicking a day opens a panel, and clicking a match in the panel opens a full detail page.
* **✅ Task 3: Add Event Functionality:** A functional form on `add.html` saves new events to `sessionStorage`, which updates the calendar.
* **✅ Task 4: Responsiveness:** The site is fully responsive, with a mobile-friendly menu, filter UI, and a "panel-to-drawer" transition for the match list.
* **✅ Task 5: Navigation:** A clear and persistent navigation header links all pages.

### Optional Features Implemented

* **✅ Filters:** A functional sport filter is included on both desktop and mobile.
* **✅ Styling and Enhancements:** The application has a clean, modern dark-mode design.
* **✅ Persistent Storage:** `sessionStorage` is used to meet the "runtime" storage requirement.
* **✅ Testing:** A `testing.md` file is included with a manual test checklist.

## 💡 Design Decisions

* **Panel vs. Page:** Instead of navigating to a new page for a *day's* events, I used a slide-over panel. This feels faster and keeps the user in the context of the calendar. On mobile, this panel transforms into a bottom drawer for better usability.
* **Session Storage:** `sessionStorage` was chosen to meet the "runtime only" requirement. It persists data across page loads (e.g., from `add.html` back to `index.html`) but is automatically cleared when the browser tab is closed, fulfilling the "no database" constraint.
* **Combined Data:** The app loads matches from both the static `matches.json` and the dynamic `sessionStorage` and combines them into a single source of truth for rendering.