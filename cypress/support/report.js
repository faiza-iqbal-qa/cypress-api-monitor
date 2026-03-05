function nowIso() {
  return new Date().toISOString();
}

const results = [];

function addResult(r) {
  results.push(r);
}

function buildResult({ name, url, ok, status, durationMs, notes }) {
  return {
    timestamp: nowIso(),
    name,
    url,
    ok,
    status,
    durationMs,
    notes: notes || "",
  };
}

function writeReport() {
  const report = {
    runAt: nowIso(),
    total: results.length,
    passed: results.filter(r => r.ok).length,
    failed: results.filter(r => !r.ok).length,
    results,
  };

  cy.writeFile("results/report.json", report);
}

module.exports = { addResult, buildResult, writeReport };
