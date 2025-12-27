
import { GoogleGenAI, Type } from "@google/genai";

export const getLetterEducation = async (letter: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `شما یک مربی مهربان مهدکودک هستید. برای حرف "${letter}" از الفبای فارسی:
      ۱. سه کلمه خیلی ساده که با این حرف شروع شوند و برای کودک ۳ ساله ملموس باشند (مثل حیوانات یا میوه‌ها).
      ۲. یک داستان بسیار کوتاه (حداکثر ۱۵ کلمه) و شاد درباره این حرف.
      پاسخ را دقیقاً با این ساختار JSON برگردانید:
      { "words": ["کلمه۱", "کلمه۲", "کلمه۳"], "story": "داستان کوتاه..." }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            words: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Three simple words starting with the letter.',
            },
            story: {
              type: Type.STRING,
              description: 'Short funny story for toddlers.',
            },
          },
          required: ["words", "story"],
        },
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Content Error:", error);
    return { words: [], story: "دوست من، بیا با هم کلمه‌های جدید یاد بگیریم!" };
  }
};
