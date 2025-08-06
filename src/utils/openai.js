import OpenAI from "openai";
import { GITHUB_AI_TOKEN } from "./constants";

const token = GITHUB_AI_TOKEN;
const endpoint = "https://models.github.ai/inference";

const openai = new OpenAI({ baseURL: endpoint, apiKey: token, dangerouslyAllowBrowser: true });

export default openai;
