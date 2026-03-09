# Cypress API Monitor

A small experiment using Cypress to monitor API health and generate a structured JSON report.

Instead of testing UI flows, this project uses Cypress to run automated checks against a list of API endpoints and record the results.

---

## What it does

The script runs a set of API checks and verifies:

- HTTP status codes
- basic response structure
- response duration

After the run completes, it generates a JSON report summarizing the results.

Example output:


results/report.json


The report contains:

- API name
- status code
- response duration
- pass/fail status
- timestamp

---

## Tech Stack

- Cypress
- Node.js
- JavaScript

---

## Setup

Install dependencies:


npm install


---

## Run the monitor


npm run monitor


This will execute the Cypress tests and generate a report.

---

## Output

After running the monitor, the report will be available at:


results/report.json


---

## Adding new API checks

Edit:


cypress/e2e/api-monitor.cy.js


Add another `checkApi()` block with:

- name
- url
- expected status
- optional validation

Example:

```javascript
checkApi({
  name: "Example API",
  url: "https://api.example.com",
  expectStatus: 200
})
Why this project

The idea was to explore using Cypress beyond UI testing and apply the same automation principles to simple API monitoring.

It’s a small experiment, but it shows how testing tools can be adapted for reliability checks as well.