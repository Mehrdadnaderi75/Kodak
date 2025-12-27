
import { GoogleGenAI } from "@google/genai";

export const generatePaintingIdea = async (topic: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `یک نقاشی بسیار ساده، کارتونی و مینیمال برای کودک ۳ ساله از موضوع: "${topic}". 
            نقاشی باید خطوط ضخیم و واضح داشته باشد، بدون جزئیات پیچیده و سایه‌زنی زیاد، 
            تا کودک بتواند آن را در دفتر نقاشی خود کپی کند. استایل شبیه کتاب رنگ‌آمیزی باشد. 
            پس‌زمینه کاملاً سفید و ساده باشد.`,
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
    console.error("Image Gen Error:", error);
    return null;
  }
};
