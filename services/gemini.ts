import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { UNIVERSITY_KNOWLEDGE_BASE } from "../constants";

let chatSession: Chat | null = null;

const getClient = (): GoogleGenAI => {
    // Ideally this comes from a secure backend, but for this demo app we assume it's available in env.
    // In a real production app, never expose keys in client-side code.
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const initializeChat = async (): Promise<Chat> => {
    if (chatSession) return chatSession;

    const ai = getClient();
    chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: UNIVERSITY_KNOWLEDGE_BASE,
        },
    });
    return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncIterable<GenerateContentResponse>> => {
    const chat = await initializeChat();
    return chat.sendMessageStream({ message });
};
