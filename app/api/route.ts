import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "API key is missing. Please set it in the environment variables."
  );
}

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chatHistory: any[] = []; // To store conversation history

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const userMessage: string = body?.prompt;

    if (!userMessage) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Start chat if not initialized
    if (chatHistory.length === 0) {
      chatHistory = [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ];
    }

    // Send message and update history
    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(userMessage);

    // Update history with user and model messages
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
    chatHistory.push({
      role: "model",
      parts: [{ text: result.response.text() }],
    });

    return NextResponse.json({ response: result.response.text() });
  } catch (error: any) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content", details: error.message },
      { status: 500 }
    );
  }
}
