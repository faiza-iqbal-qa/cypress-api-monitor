# Cypress API Monitor (JSON Report)

A tiny Cypress project that monitors a list of APIs and generates a JSON report after each run.

This is not UI testing — it uses Cypress as a lightweight API monitor:
- calls URLs
- checks status codes
- optionally validates response fields
- writes a single report to `results/report.json`

---

## What you get
✅ A repeatable API health check run  
✅ A clean JSON output you can share/log/extend  
✅ Easy to add new endpoints in one place

---

## Project structure
- `cypress/e2e/api-monitor.cy.js` → main test (your endpoints live here)
- `cypress/support/e2e.js` → Cypress required support file
- `cypress/support/report.js` → builds/writes the JSON report
- `results/report.json` → generated output (created after a run)

---

## Setup
### 1) Install dependencies
```bash
npm install

Run
Run the monitor once
npm run monitor
Output

After the run finishes, you’ll see:

results/report.json

To view it:

cat results/report.json
Add your own endpoints

Open:
cypress/e2e/api-monitor.cy.js

Add another block like this:

checkApi({
  name: "My API",
  url: "https://example.com/api",
  expectStatus: 200,
  validate: (res) => {
    expect(res.body).to.have.property("something");
  },
});
Notes

results/ is generated after every run (you usually don’t commit it).

This project is meant to be simple and extendable (retries, alerts, CI, cron, etc).


---

## 2) Baby steps after README (blindly follow)

### Step A: Save README
Make sure the file is saved as:
`README.md` in your project root.

---

### Step B: Fix the Cypress error (support file)
Run this command **exactly** (it creates the missing file Cypress wants):

```bash
mkdir -p cypress/support
cat > cypress/support/e2e.js <<'EOF'
// Cypress support file.
// Loaded automatically before spec files.
EOF

Step C: Run it successfully
npm install
npm run monitor

Step D: Confirm the report is created
ls -la results
cat results/report.json

If you can see the JSON report, you’re done with the core build.


