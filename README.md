# SentinelAI — AI-Powered AWS Cloud Threat Investigation & Response

## Project Overview:
SentinelAI is a cloud security engineering project designed to investigate suspicious AWS activity, organize security evidence, assess incident severity, and support controlled incident response.
The platform combines event-driven AWS security workflows with AI-assisted investigation and auditable response decisions.

## Objectives:
- Detect selected suspicious AWS activity.
- Collect and preserve relevant investigation evidence.
- Apply transparent, explainable risk-scoring rules.
- Generate evidence-grounded AI incident summaries.
- Track incident status, approval decisions, and response outcomes.
- Validate security controls, least-privilege access, and AI safety.

## Planned Technology:
- AWS CloudTrail
- Amazon EventBridge
- AWS Lambda
- Amazon DynamoDB
- An optional large language model integration
- Visual documentation and testing with VS Code and GitHub

The final service configuration will depend on availability, security requirements, and cost validation.

## Security Principles:
- Least-privilege access
- No hard-coded credentials
- Human approval for consequential response actions
- Evidence-based findings
- Input validation and AI output validation
- Auditable incident handling
- Cost-aware resource deployment

## Project Status:
**Phase 1: Architecture and threat modeling**
Implementation and test results will be documented as the project progresses. Planned features are not represented as completed capabilities.

## Repository Structure:
- `docs/` — Architecture, threat model, and engineering decisions
- `screenshots/` — Verified project evidence
- `sample-events/` — Sanitized synthetic security events
- `tests/` — Validation scenarios and test results

## Disclaimer:
This is an educational cloud security engineering project. Testing will use authorized AWS resources and controlled sample events. Automated response actions will remain restricted until their permissions, safeguards, and approval workflow have been validated.
