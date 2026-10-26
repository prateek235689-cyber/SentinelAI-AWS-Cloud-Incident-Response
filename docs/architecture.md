# SentinelAI Architecture

## 1. Purpose:
SentinelAI is an educational AWS cloud security platform for investigating suspicious IAM policy changes using event-driven processing, deterministic risk scoring, AI-assisted analysis, and controlled incident response.

## 2. Initial Use Case:
The first detection scenario focuses on selected IAM policy-changing API operations.
Examples include:
- PutRolePolicy
- AttachRolePolicy
- PutUserPolicy
- AttachUserPolicy
- CreatePolicyVersion
- SetDefaultPolicyVersion

These events are investigation triggers, not automatic proof of malicious activity.

## 3. Proposed Components:

### AWS CloudTrail
Provides records of relevant AWS API activity.

### Amazon EventBridge
Matches selected events and forwards matching events to the processing workflow.

### AWS Lambda
Validates event fields, applies deterministic risk rules, and prepares a structured incident record.

### Amazon DynamoDB
Stores incident identifiers, event metadata, risk scores, investigation status, and response audit information.

### AI Analysis Layer
Optionally analyzes sanitized event evidence and generates a structured investigation summary. AI output must distinguish observed facts from hypotheses and recommendations.

### Human Review
A reviewer assesses the evidence and authorizes any consequential remediation.

## 4. Event Flow:
1. An IAM policy-changing event occurs or a synthetic event is submitted for testing.
2. The event is received by the detection workflow.
3. The event is validated and normalized.
4. Deterministic rules calculate the initial risk score.
5. An incident record is stored.
6. The optional AI layer analyzes the available evidence.
7. A human reviews recommendations and decides on next steps.
8. The response outcome is recorded and verified.

## 5. Security Boundaries:
- Event ingestion and incident processing use separate, narrowly scoped permissions.
- The AI layer does not receive unrestricted AWS access.
- Untrusted event fields are treated as data, never as instructions.
- Remediation requires an explicit approval mechanism.
- Incident records must not contain unnecessary secrets or sensitive information.
- Errors and failed processing attempts must be observable.

## 6. Availability and Cost Considerations:
The first deployment will use a minimal set of AWS services and controlled test events. Service pricing, account eligibility, logging requirements, and regional availability must be checked before deployment.
AI inference is optional and will be added only after its cost and security implications are reviewed.

## 7. Current Status:
This document describes the proposed architecture. Components and integrations will be marked implemented only after successful testing.

## 8. Future Enhancements:
- Additional cloud security detections
- Incident deduplication and correlation
- More comprehensive investigation evidence
- Measured detection quality and AI evaluation
- Controlled remediation with outcome verification
