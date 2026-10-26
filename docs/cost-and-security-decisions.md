# SentinelAI Cost and Security Decisions

## Project Constraints
- AWS region: ap-south-1
- Workflow: AWS Console, VS Code, and GitHub website
- Budget preference: free-tier-conscious
- Deployment style: incremental and test-driven

## Initial Decisions

### D001 — Begin with Synthetic Events:
Decision:
Use sanitized synthetic events for initial development and validation.
Reason:
This allows the event schema, risk rules, and AI analysis format to be tested before deploying the full cloud pipeline.
Status: Accepted

### D002 — Keep Risk Scoring Deterministic:
Decision:
Calculate the initial risk score using documented rules.
Reason:
The same event should produce a reproducible score, independently of AI model variation.
Status: Accepted

### D003 — Require Human Approval:
Decision:
Do not allow AI output to independently execute consequential remediation.
Reason:
AI can produce incorrect or manipulated recommendations.
Status: Accepted

### D004 — Verify Costs Before Deployment:
Decision:
Review current AWS pricing, regional availability, account eligibility, logging charges, and expected usage before creating resources.
Reason:
Service usage and account-specific offers can create charges even when a project is designed to minimize cost.
Status: Pending deployment review

### D005 — Introduce AI After Core Validation:
Decision:
Build and test event validation, risk scoring, and incident storage before enabling model inference.
Reason:
This isolates failures and avoids unnecessary AI costs during early development.
Status: Accepted

### D006 — Use Least Privilege:
Decision:
Every AWS role will receive only the permissions required for its specific task.
Reason:
Compromise of one component should not automatically grant control over the entire platform.
Status: Accepted

## Deployment Checklist:
- [ ] Verify AWS account access and current billing status.
- [ ] Check service pricing and regional availability.
- [ ] Review IAM permissions before creating roles.
- [ ] Confirm logging and retention choices.
- [ ] Test with synthetic events first.
- [ ] Verify cleanup procedures for temporary resources.


## Milestone 3 — Environment Readiness:
### Region
Target region: ap-south-1 (Mumbai)
### Account Access
Status: Pending verification
The project will use an appropriately scoped non-root identity. Root credentials will not be used for routine project development.
### Billing and Budget Controls
Status: Pending verification
Current charges, applicable Free Tier offers, available budget controls, and service pricing must be reviewed before deployment.
### Existing Resources
Status: Pending inventory
Existing AWS resources will be distinguished from SentinelAI resources. No unrelated resources will be modified or deleted.
### Deployment Authorization
Status: Not yet approved
No SentinelAI production event pipeline will be deployed until access, permissions, pricing, and resource requirements have been reviewed.
### Next Decision
Determine whether the account is ready for a minimal, controlled event-processing implementation.

