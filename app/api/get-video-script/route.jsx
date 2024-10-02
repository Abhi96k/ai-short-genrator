import { startChatSession } from "../../../configs/AiModel.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log(prompt);

    // Start a chat session
    const chatSession = await startChatSession();

    if (!chatSession || !chatSession.sendMessage) {
      throw new Error(
        "Chat session not initialized or sendMessage is not available"
      );
    }

    const result = await chatSession.sendMessage(prompt);

    const responseText = await result.response.text();
    console.log(responseText);

    return NextResponse.json({
      result: JSON.parse(responseText),
    });
  } catch (e) {
    console.log("Error:", e);

    return NextResponse.json(
      {
        error: "Something went wrong",
        details: e.message || e.toString(),
      },
      {
        status: 500,
      }
    );
  }
}
