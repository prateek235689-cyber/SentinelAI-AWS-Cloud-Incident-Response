# SentinelAI Threat Model

## 1. Scope:
This threat model covers the initial IAM policy-change investigation workflow, from event ingestion through AI-assisted analysis and human-approved response.

## 2. Assets to Protect:
- AWS account and cloud resources
- IAM identities and permissions
- Cloud security event records
- Incident records and investigation evidence
- AI prompts and model outputs
- Response approvals and audit history
- Credentials and configuration secrets

## 3. Trust Boundaries:
1. AWS event source to event-processing service
2. Event-processing service to incident database
3. Incident evidence to AI analysis
4. AI recommendations to the human reviewer
5. Human-approved response to AWS control actions

## 4. Threat Scenarios:
### T1: Unauthorized IAM Policy Change:
Threat:
An actor makes an unauthorized change that grants excessive permissions.
Impact:
Privilege escalation, unauthorized access, or exposure of cloud resources.
Mitigations:
- Detect selected policy-changing API operations.
- Preserve relevant event metadata.
- Apply least-privilege access controls.
- Require human investigation before consequential remediation.

### T2: Forged or Malformed Event Data:
Threat:
An unexpected or malformed event causes incorrect processing or a misleading incident record.
Impact:
False alerts, processing failures, or incorrect conclusions.
Mitigations:
- Validate required fields and data types.
- Reject or quarantine invalid events.
- Use synthetic events for negative testing.
- Avoid treating missing fields as proof of malicious activity.

### T3: Prompt Injection Through Event Content:
Threat:
An event field contains text designed to manipulate the AI analysis.
Impact:
Misleading conclusions, unsafe recommendations, or disclosure of information included in the prompt.
Mitigations:
- Treat event content as untrusted data.
- Separate event evidence from system instructions.
- Do not give the model direct authority to execute response actions.
- Validate output structure and factual claims.
- Test adversarial event content.

### T4: Excessive AWS Permissions:
Threat:
A processing function or compromised component has more permissions than necessary.
Impact:
Unauthorized modification or access to cloud resources.
Mitigations:
- Use dedicated IAM roles.
- Grant only required actions on required resources.
- Avoid root-user credentials for routine work.
- Review policies before deployment.

### T5: Sensitive Data Exposure:
Threat:
Logs, prompts, incident records, or repository files expose sensitive information.
Impact:
Credential compromise or unauthorized disclosure.
Mitigations:
- Never commit credentials or API keys.
- Minimize sensitive fields sent to the AI service.
- Use sanitized synthetic test events.
- Restrict access to stored evidence.
- Review logs and repository contents before publication.

### T6: Unsafe Automated Remediation:
Threat:
A false positive or manipulated AI recommendation triggers an inappropriate response.
Impact:
Service disruption, accidental access loss, or unauthorized changes.
Mitigations:
- Begin with response simulation.
- Require explicit human approval.
- Use narrowly scoped response permissions.
- Record approvals and outcomes.
- Verify changes after an authorized action.

### T7: Duplicate or Failed Event Processing:
Threat:
Events are delivered more than once or processing fails partway through.
Impact:
Duplicate incidents, missing records, or inconsistent status.
Mitigations:
- Design an idempotent incident-creation process.
- Use stable event identifiers where available.
- Handle retries and failures deliberately.
- Test duplicate and malformed inputs.

## 5. Risk Assessment Method:
Each threat will be evaluated for likelihood and impact using a documented scale. Risk ratings represent engineering assessments and must be updated when implementation evidence becomes available.

## 6. Residual Risk:
No control eliminates all risk. Remaining limitations, untested scenarios, and accepted risks will be documented before the platform is considered validated.

## 7. Validation Plan:
- Test valid and invalid event inputs.
- Test duplicate event delivery.
- Verify least-privilege permissions.
- Test prompt-injection attempts.
- Verify that AI output cannot independently trigger remediation.
- Confirm that incident records and audit information are preserved.

## 8. Current Status:
This is the initial design-stage threat model. Mitigations must be verified through implementation and testing before being described as effective.
