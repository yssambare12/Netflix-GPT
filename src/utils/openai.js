import OpenAI from "openai";
import { GITHUB_AI_TOKEN } from "./constants";

// Prefer GitHub Models if token provided; fallback to OpenAI if OPENAI key exists
const githubToken = GITHUB_AI_TOKEN;
const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

let client;

if (githubToken) {
  // Correct GitHub Models endpoint
  client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: githubToken,
    dangerouslyAllowBrowser: true,
  });
} else if (openaiApiKey) {
  client = new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true,
  });
} else {
  // Create a dummy client that throws helpful errors when used
  client = {
    chat: {
      completions: {
        create: async () => {
          throw new Error(
            "Missing AI API key. Set REACT_APP_GITHUB_AI_TOKEN (GitHub Models) or REACT_APP_OPENAI_API_KEY in your environment."
          );
        },
      },
    },
  };
}

export default client;
