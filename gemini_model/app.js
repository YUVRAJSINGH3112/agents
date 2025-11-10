import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import path from 'path'
import { AIMessage, SystemMessage, HumanMessage } from "langchain";

dotenv.config({ path: path.resolve("../.env") });

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

const aiMsg = new AIMessage("I'd be happy to help you with that question!");

const messages = [
  new SystemMessage("You are a helpful assistant"),
  new HumanMessage("Can you help me?"),
  aiMsg,  // Insert as if it came from the model
  new HumanMessage("Great! What's 2+2?")
]

model.invoke(messages).then((response) => {
    console.log(response.content);
}).catch((error) => {
    console.error("Error invoking the model:", error);
})