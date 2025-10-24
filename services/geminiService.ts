import { GoogleGenAI } from "@google/genai";
import { EXPERTS } from '../constants';
import type { ChatMessage, Source } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = ai.models;

export async function runSimulation(
  query: string,
  rounds: number,
  onMessageUpdate: (message: ChatMessage, expertName: string) => void,
  onSummaryUpdate: (summary: string, sources: Source[]) => void,
  signal: AbortSignal
) {
  let conversationHistory = "";
  const masterSystemInstruction = `You are an AI orchestrator managing a team of financial expert AIs. Your goal is to simulate a debate between them to produce a comprehensive investment analysis for the user. Ensure each expert stays in character and critically evaluates the points made by others. Crucially, you must use real-time, up-to-date information from Google Search to inform your analysis, ensuring all data points, news, and market conditions are current.`;

  // Discussion phase
  for (let i = 0; i < rounds; i++) {
    for (const expert of EXPERTS) {
      if (signal.aborted) throw new DOMException("Aborted by user", "AbortError");

      onMessageUpdate({ id: '', expertId: 'system', text: '' }, expert.name);

      const prompt = `
        **User's Request:** ${query}

        **Your Role:** ${expert.promptPersona}

        **Previous Discussion (Round ${i + 1} of ${rounds}):**
        ${conversationHistory.length > 0 ? conversationHistory : "No discussion yet. You are the first to speak this round."}

        **Your Task:**
        Based on your unique role and the discussion so far, provide your analysis. Critically evaluate previous points if they exist. Keep your response focused, professional, and concise. Do not introduce yourself.
      `;

      try {
        const response = await model.generateContent({
          model: 'gemini-2.5-pro',
          contents: prompt,
          config: {
            systemInstruction: masterSystemInstruction,
            tools: [{googleSearch: {}}],
          }
        });
        
        if (signal.aborted) throw new DOMException("Aborted by user", "AbortError");

        const expertResponseText = response.text;
        
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
            ?.map(chunk => chunk.web)
            .filter((web): web is { uri: string; title: string } => !!(web?.uri && web.title)) ?? [];

        const newMessage: ChatMessage = { 
            id: `msg-${Date.now()}-${expert.id}`, 
            expertId: expert.id, 
            text: expertResponseText,
            sources,
        };
        onMessageUpdate(newMessage, expert.name);

        conversationHistory += `\n\n**${expert.name} (${expert.title}):**\n${expertResponseText}`;
      } catch (e) {
          console.error(`Error with ${expert.name}:`, e);
          const errorMessage: ChatMessage = {
              id: `err-${Date.now()}`,
              expertId: 'system',
              text: `An error occurred while getting a response from ${expert.name}. Skipping.`
          };
          onMessageUpdate(errorMessage, 'System');
          // continue to the next expert
      }
    }
  }

  if (signal.aborted) throw new DOMException("Aborted by user", "AbortError");
  
  // Summarization phase
  const summaryPrompt = `
    **User's Request:** ${query}

    **Full Expert Discussion Transcript:**
    ${conversationHistory}

    **Your Task:**
    You are a Lead Investment Strategist. Synthesize the entire discussion above. Use your ability to access real-time information to verify facts and provide the most current possible outlook. Your final report must be well-structured and comprehensive.
    1.  Start with a concise **Executive Summary** of the final recommendation.
    2.  Provide a **Detailed Analysis** section summarizing the key arguments from each expert perspective (Macro, Industry, Market, Quant, Technical).
    3.  Create a **Key Debates & Nuances** section, highlighting the main points of agreement and disagreement.
    4.  Conclude with a clear, actionable **Final Investment Recommendation**, weighing the different perspectives and outlining potential risks.
    5.  Format the output using Markdown for clarity (e.g., use headings like ## Executive Summary, bold text, and bullet points).
  `;

  const summaryResponse = await model.generateContent({
    model: 'gemini-2.5-pro',
    contents: summaryPrompt,
    config: {
        tools: [{googleSearch: {}}],
    }
  });

  if (signal.aborted) throw new DOMException("Aborted by user", "AbortError");

  const summaryText = summaryResponse.text;
  const summarySources = summaryResponse.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map(chunk => chunk.web)
    .filter((web): web is { uri: string; title: string } => !!(web?.uri && web.title)) ?? [];

  onSummaryUpdate(summaryText, summarySources);
}