import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const projectDirectory = path.dirname(currentFile);

const rulesPath = path.join(
  projectDirectory,
  "tests",
  "detection-rules.json"
);

const scoringPath = path.join(
  projectDirectory,
  "tests",
  "risk-scoring.json"
);

const rulesConfig = JSON.parse(
  fs.readFileSync(rulesPath, "utf8")
);

const scoringConfig = JSON.parse(
  fs.readFileSync(scoringPath, "utf8")
);

function classifySeverity(score) {
  for (const [severity, range] of Object.entries(
    scoringConfig.severityThresholds
  )) {
    if (
      score >= range.minimum &&
      score <= range.maximum
    ) {
      return severity;
    }
  }

  return "UNKNOWN";
}

function detectEvent(event) {
  const detail = event?.detail;

  if (
    !detail ||
    typeof detail.eventSource !== "string" ||
    typeof detail.eventName !== "string"
  ) {
    return {
      matched: false,
      error: "Invalid event: required fields are missing."
    };
  }

  const matchingRule = rulesConfig.rules.find(
    (rule) =>
      rule.eventSource === detail.eventSource &&
      rule.eventNames.includes(detail.eventName)
  );

  if (!matchingRule) {
    return {
      matched: false,
      reason: "No configured detection rule matched."
    };
  }

  const factors = [];

  factors.push({
    factor: "iamPolicyModification",
    points: 40,
    applied: true
  });

  const request = detail.requestParameters ?? {};
  const policyText = JSON.stringify(request).toLowerCase();

  const privilegedIndicators = [
    "administratoraccess",
    "iam:*",
    "\"action\":\"*\"",
    "\"action\": \"*\""
  ];

  const privilegedPolicyTarget =
    privilegedIndicators.some((indicator) =>
      policyText.includes(indicator)
    );

  factors.push({
    factor: "privilegedPolicyTarget",
    points: 25,
    applied: privilegedPolicyTarget
  });

  // Context is not inferred from this sample alone.
  factors.push({
    factor: "unusualActivityContext",
    points: 20,
    applied: false,
    status: "NOT_ASSESSED"
  });

  factors.push({
    factor: "failedOrMissingContextValidation",
    points: 15,
    applied: false,
    status: "NOT_ASSESSED"
  });

  const score = Math.min(
    scoringConfig.maximumScore,
    factors.reduce(
      (total, factor) =>
        total + (factor.applied ? factor.points : 0),
      0
    )
  );

  return {
    matched: true,
    ruleId: matchingRule.ruleId,
    ruleName: matchingRule.name,
    eventName: detail.eventName,
    eventSource: detail.eventSource,
    region: detail.awsRegion ?? event.region ?? "UNKNOWN",
    synthetic: event.sentinelai?.isSynthetic === true,
    riskScore: score,
    severity: classifySeverity(score),
    factors,
    requiresHumanReview: score >= 60,
    automatedRemediation: false,
    note: "A detection is an investigation lead, not proof of malicious intent."
  };
}

export { detectEvent };
