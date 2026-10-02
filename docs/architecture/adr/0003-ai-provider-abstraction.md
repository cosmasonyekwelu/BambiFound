# ADR 0003: AI Provider Abstraction (OpenAI & Groq)

## Context
BambiFound relies on AI capabilities (profile understanding, matching rationale, natural language intent processing). We must avoid vendor lock-in and ensure resilience against API outages.

## Decision
1. Create an internal **`AIService` provider interface**:
   - Primary Adapter: **OpenAI API** (`gpt-4o-mini`).
   - Fallback Adapter: **Groq API** (`llama3-70b-8192`).
2. Business logic depends strictly on `AIService.generateCompletion(...)`, NEVER on direct `openai` or `groq-sdk` SDK calls scattered through business modules.
3. Secret keys (`OPENAI_API_KEY`, `GROQ_API_KEY`) remain strictly on the backend API server and are never exposed to browser clients.

## Consequences
- Zero vendor coupling in business logic.
- Automatic failover from OpenAI to Groq in case of rate limits or service degradation.
- Safe AI secret key management.
