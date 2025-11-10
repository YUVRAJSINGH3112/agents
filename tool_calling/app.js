import * as z from "zod";
import { createAgent, tool } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import path from 'path'

dotenv.config({ path: path.resolve("../.env") });

const search = tool(
  ({ query }) => `Results for: ${query}`,
  {
    name: "search",
    description: "Search for information",
    schema: z.object({
      query: z.string().describe("The query to search for"),
    }),
  }
);

const getWeather = tool(
  ({ location }) => `Weather in ${location}: Sunny, 72°F`,
  {
    name: "get_weather",
    description: "Get weather information for a location",
    schema: z.object({
      location: z.string().describe("The location to get weather for"),
    }),
  }
);
const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GOOGLE_API_KEY,
  });
const agent = createAgent({
  model,
  tools: [search, getWeather],
});

const response = await agent.invoke({
    messages: [{ role: "user", content: "What's the weather in San Francisco?" }],
  })
  console.log("Full response:", response);
  const finalMessage = response.messages[response.messages.length - 1];

  console.log(finalMessage); 