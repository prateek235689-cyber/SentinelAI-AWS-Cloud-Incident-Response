import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { detectEvent } from "./detector.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const testPath = path.join(root, "tests", "test-cases.json");

const { testCases } = JSON.parse(
  fs.readFileSync(testPath, "utf8")
);

let passed = 0;
let failed = 0;

for (const testCase of testCases) {
  let event = testCase.event;

  if (testCase.eventFile) {
    const eventPath = path.join(root, testCase.eventFile);
    event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
  }

  const result = detectEvent(event);
  const matchedCorrectly =
    result.matched === testCase.expectedMatched;

  const scoreCorrectly =
    testCase.expectedRiskScore === undefined ||
    result.riskScore === testCase.expectedRiskScore;

  const severityCorrectly =
    testCase.expectedSeverity === undefined ||
    result.severity === testCase.expectedSeverity;

  const errorCorrectly =
    testCase.expectedError !== true ||
    Boolean(result.error);

  const success =
    matchedCorrectly &&
    scoreCorrectly &&
    severityCorrectly &&
    errorCorrectly;

  if (success) {
    passed++;
  } else {
    failed++;
  }

  console.log(
    `${success ? "PASS" : "FAIL"} ${testCase.id}: ${testCase.description}`
  );

  if (!success) {
    console.log("Expected:", testCase);
    console.log("Actual:", result);
  }
}

console.log(`\nResults: ${passed} passed, ${failed} failed, ${testCases.length} total`);

if (failed > 0) {
  process.exitCode = 1;
}
