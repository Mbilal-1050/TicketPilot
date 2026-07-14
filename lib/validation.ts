// lib/validation.ts
import { z } from "zod";

export const createRoutingRuleSchema = z.object({
  name: z.string().min(1).max(100),
  priority: z.number().int().min(0).max(100),
  conditions: z.object({
    field: z.enum(["keyword", "sentiment", "customerTier", "topic"]),
    operator: z.enum(["equals", "contains"]),
    value: z.string().min(1).max(200),
  }),
  actions: z.object({
    classification: z.enum(["AUTO_RESOLVE", "DRAFT_FOR_REVIEW", "ESCALATE"]),
    assignTo: z.string().optional(),
  }),
});

export const createKnowledgeBaseDocSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(50_000),
  sourceType: z.enum(["manual", "faq", "past_ticket", "doc_upload"]).default("manual"),
});

export const updateAiToneSchema = z.object({
  aiTone: z.enum(["formal", "casual", "friendly"]),
});

export const feedbackSchema = z.object({
  message: z.string().min(1).max(2000),
  companyId: z.string().cuid(),
});
