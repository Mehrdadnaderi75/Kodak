
import { GoogleGenAI } from "@google/genai";

export const generatePaintingIdea = async (topic: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A very simple, bold black-and-white coloring book style drawing of "${topic}" for a 3-year-old child. Thick lines, minimal details, friendly cartoon style, white background, single object, centered.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Service Error:", error);
    return null;
  }
};
