import { GoogleGenerativeAI } from "@google/generative-ai";

// yaha apni API key daal
const genAI = new GoogleGenerativeAI("AIzaSyA2G1mQlAOttgm7iUWOzV_iTjFtwjJvzHE");

async function run() {
  // model choose karo (latest text model use kar: gemini-2.0-flash ya gemini-2.0-pro, jo available ho)
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = "say hello to me ";

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  console.log("Model response:", text);
}

run().catch(console.error);
