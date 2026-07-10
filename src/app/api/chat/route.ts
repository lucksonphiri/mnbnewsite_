import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MNB_SYSTEM_PROMPT = `
You are the official AI assistant for MNB College.
Answer school questions and also answer general academic questions clearly.
Use simple, professional English.
If the question is about MNB College and you are unsure, refer the user to the school office.
`;

export async function POST(req: Request) {
  try {
    console.log(
      "OPENAI KEY:",
      process.env.OPENAI_API_KEY ? "FOUND" : "NOT FOUND"
    );

    const body = await req.json();
    const question = body.question;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { answer: "Please type a question." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ answer: "The AI assistant is not configured. Please contact the school office." }, { status: 503 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: MNB_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    return NextResponse.json({
      answer: response.output_text,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        answer:
          "Sorry, the AI assistant failed to respond. Please check the server terminal for the exact error.",
      },
      { status: 500 }
    );
  }
}