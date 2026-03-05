const { addResult, buildResult, writeReport } = require("../support/report");

function checkApi({ name, url, expectStatus = 200, validate }) {
  cy.request({
    url,
    failOnStatusCode: false,
  }).then((res) => {
    let ok = true;
    const notes = [];

    if (res.status !== expectStatus) {
      ok = false;
      notes.push(`Expected ${expectStatus}, got ${res.status}`);
    }

    const durationMs = res.duration;
    if (typeof durationMs === "number" && durationMs > 3000) {
      notes.push(`Slow: ${durationMs}ms`);
    }

    try {
      if (validate) validate(res);
    } catch (e) {
      ok = false;
      notes.push(`Validation failed: ${e.message}`);
    }

    addResult(buildResult({
      name,
      url,
      ok,
      status: res.status,
      durationMs: typeof durationMs === "number" ? durationMs : null,
      notes: notes.join(" | "),
    }));

    expect(ok, `${name} health check`).to.eq(true);
  });
}

describe("API Monitoring Bot", () => {

  after(() => {
    writeReport();
  });

  it("checks selected APIs", () => {

    checkApi({
      name: "GitHub API",
      url: "https://api.github.com",
      expectStatus: 200,
      validate: (res) => {
        expect(res.body).to.have.property("current_user_url");
      },
    });

    checkApi({
      name: "JSONPlaceholder /posts/1",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      expectStatus: 200,
      validate: (res) => {
        expect(res.body).to.have.property("id", 1);
      },
    });

    checkApi({
      name: "httpbin 200",
      url: "https://httpbin.org/status/200",
      expectStatus: 200,
    });

  });
});
