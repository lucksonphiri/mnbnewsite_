"use client";

import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { chatbotFAQs } from "@/data/chatbotFAQs";

type ChatMessage = {
  sender: "bot" | "user";
  text: string;
  showWhatsapp?: boolean;
};

const whatsappNumber = "263787282897";

export default function ChatbotPlaceholder() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hello 👋 Welcome to MNB College. You can ask me about admissions, fees, boarding, location, ZIMSEC, Cambridge, vision or mission.",
    },
  ]);

  function findAnswer(question: string) {
    const lowerQuestion = question.toLowerCase();

    const match = chatbotFAQs.find((item) =>
      item.keywords.some((keyword) => lowerQuestion.includes(keyword.toLowerCase()))
    );

    return match ? match.answer : null;
  }

  function aiCannotAnswer(answer: string | null | undefined) {
    if (!answer) return true;

    const lowerAnswer = answer.toLowerCase();

    return (
      lowerAnswer.includes("i don't know") ||
      lowerAnswer.includes("i do not know") ||
      lowerAnswer.includes("cannot answer") ||
      lowerAnswer.includes("can't answer") ||
      lowerAnswer.includes("not sure") ||
      lowerAnswer.includes("no information")
    );
  }

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userQuestion = input.trim();
    setInput("");

    setMessages((previous) => [
      ...previous,
      { sender: "user", text: userQuestion },
    ]);

    const faqAnswer = findAnswer(userQuestion);

    if (faqAnswer) {
      setMessages((previous) => [
        ...previous,
        { sender: "bot", text: faqAnswer },
      ]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userQuestion }),
      });

      const data = await response.json();
      const aiAnswer = data.answer || data.message || data.response;

      if (aiCannotAnswer(aiAnswer)) {
        setMessages((previous) => [
          ...previous,
          {
            sender: "bot",
            text: "Sorry, I could not answer that question clearly. Please chat with our school office on WhatsApp for assistance.",
            showWhatsapp: true,
          },
        ]);
      } else {
        setMessages((previous) => [
          ...previous,
          { sender: "bot", text: aiAnswer },
        ]);
      }
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: "Sorry, I could not connect to the AI assistant. Please chat with our school office on WhatsApp for assistance.",
          showWhatsapp: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          aria-label="Open MNB chatbot"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[var(--mnb-gold)] text-[var(--mnb-navy)] shadow-2xl grid place-items-center"
          title="Ask MNB"
        >
          <MessageCircle />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[92vw] rounded-2xl bg-white shadow-2xl border overflow-hidden">
          <div className="bg-[var(--mnb-navy)] text-white px-4 py-3 flex items-center justify-between">
            <div>
              <h3 className="font-black">MNB Virtual Assistant</h3>
              <p className="text-xs text-blue-100">Ask general school questions</p>
            </div>

            <button onClick={() => setOpen(false)} aria-label="Close chatbot">
              <X />
            </button>
          </div>

          <div className="h-[330px] overflow-y-auto p-4 bg-[var(--mnb-light)] space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  message.sender === "bot"
                    ? "bg-white text-gray-700"
                    : "bg-[var(--mnb-navy)] text-white ml-auto"
                }`}
              >
                {message.text}

                {message.showWhatsapp && (
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block rounded-xl bg-green-600 px-4 py-2 text-center font-bold text-white"
                  >
                    Chat on WhatsApp
                  </a>
                )}
              </div>
            ))}

            {loading && (
              <div className="max-w-[85%] rounded-2xl bg-white px-4 py-3 text-sm text-gray-700">
                Thinking...
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSend();
                }}
                placeholder="Type your question..."
                className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none"
              />

              <button
                onClick={handleSend}
                disabled={loading}
                className="rounded-xl bg-[var(--mnb-gold)] px-4 py-2 text-[var(--mnb-navy)] font-bold disabled:opacity-60"
              >
                <Send size={18} />
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              For further clarification, you will be referred to a WhatsApp chat with our staff
            </p>
          </div>
        </div>
      )}
    </>
  );
}