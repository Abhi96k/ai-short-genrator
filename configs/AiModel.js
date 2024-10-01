import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);


export async function startChatSession() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const chatSession = await model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,

        responseMimeType: "application/json",
      },
      history: [],
    });

    return chatSession;
  } catch (error) {
    console.error("Error starting chat session:", error);
    throw error;
  }
}
