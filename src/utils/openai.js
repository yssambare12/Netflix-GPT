import OpenAI from "openai";
import { GITHUB_AI_TOKEN } from "./constants";


const githubToken = GITHUB_AI_TOKEN;
const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

let client;

if (githubToken) {

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
