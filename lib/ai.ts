// lib/ai.ts
//
// AI triage engine — powered by Groq (free tier, fast Llama models).
// Handles: ticket classification, reply drafting, and summarization.
//
// To switch to Claude later: swap the Groq client for @anthropic-ai/sdk,
// keep the same function signatures so nothing else in the app needs to change.

import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not set");
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODEL = "llama-3.3-70b-versatile"; // fast + capable, good for triage tasks

export type TriageResult = {
  classification: "AUTO_RESOLVE" | "DRAFT_FOR_REVIEW" | "ESCALATE";
  sentiment: "positive" | "neutral" | "negative";
  summary: string;
  draftReply: string | null;
};

/**
 * Classifies a support ticket and drafts a reply using the company's
 * knowledge base for grounding.
 */
export async function triageTicket(params: {
  ticketContent: string;
  customerTier?: string | null;
  tone: string; // "formal" | "casual" | "friendly"
  knowledgeBase: { title: string; content: string }[];
}): Promise<TriageResult> {
  const { ticketContent, customerTier, tone, knowledgeBase } = params;

  const kbContext = knowledgeBase
    .map((doc) => `### ${doc.title}\n${doc.content}`)
    .join("\n\n")
    .slice(0, 6000); // keep prompt size reasonable

  const systemPrompt = `You are a support ticket triage assistant. Given a customer ticket, you must:
1. Classify it as one of: AUTO_RESOLVE (simple, you can answer directly from the knowledge base), DRAFT_FOR_REVIEW (you can draft a reply but a human should approve it), or ESCALATE (too complex, sensitive, or angry for AI to handle alone).
2. Detect the customer's sentiment: positive, neutral, or negative.
3. Write a 1-2 sentence summary for internal use.
4. If classification is AUTO_RESOLVE or DRAFT_FOR_REVIEW, draft a reply in a ${tone} tone using the knowledge base below. If ESCALATE, leave draftReply as null.

Knowledge base:
${kbContext || "(no knowledge base documents uploaded yet)"}

Respond ONLY with valid JSON in this exact shape, no markdown fences, no preamble:
{"classification": "...", "sentiment": "...", "summary": "...", "draftReply": "..." | null}`;

  const userPrompt = `Customer tier: ${customerTier ?? "standard"}\n\nTicket:\n${ticketContent}`;

  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.3,
    max_tokens: 800,
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";

  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return {
      classification: parsed.classification ?? "ESCALATE",
      sentiment: parsed.sentiment ?? "neutral",
      summary: parsed.summary ?? "",
      draftReply: parsed.draftReply ?? null,
    };
  } catch (err) {
    console.error("Failed to parse AI triage response:", raw, err);
    // Fail safe: escalate to a human rather than silently dropping the ticket
    return {
      classification: "ESCALATE",
      sentiment: "neutral",
      summary: "AI classification failed — routed to human review.",
      draftReply: null,
    };
  }
}
