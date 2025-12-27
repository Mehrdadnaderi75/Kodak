
import { GoogleGenAI, Type } from "@google/genai";

const getApiKey = () => {
  return (typeof process !== 'undefined' && process.env?.API_KEY) || "";
};

export const getLetterEducation = async (letter: string) => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `شما یک مربی مهدکودک هستید. برای حرف "${letter}" الفبای فارسی:
      ۱. سه کلمه ساده که با این حرف شروع شوند و برای کودک ۳ ساله قابل درک باشند ارائه دهید.
      ۲. یک داستان بسیار کوتاه و خنده‌دار (حداکثر ۲۰ کلمه) درباره این حرف بگویید.
      پاسخ را فقط به صورت JSON با ساختار { "words": ["word1", "word2", "word3"], "story": "..." } برگردانید.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            words: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Three simple Persian words starting with the letter.',
            },
            story: {
              type: Type.STRING,
              description: 'A very short funny story for kids.',
            },
          },
          required: ["words", "story"],
        },
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return { words: [], story: "اوه! دوست کوچولو، فعلاً قصه‌گوی ما خوابش برده." };
  }
};
