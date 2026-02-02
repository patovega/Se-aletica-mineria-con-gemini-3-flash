import { GoogleGenAI } from "@google/genai";

export const generatePictogram = async (prompt: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Professional industrial safety pictogram: ${prompt}. 
                   TECHNICAL SPECS: Solid black silhouette (#000000) on a PERFECTLY PURE WHITE background (#FFFFFF). 
                   ISO 7010 style. 
                   STRICT RULES: 
                   1. NO TEXT, NO LETTERS, NO NUMBERS, NO LABELS.
                   2. ONLY the object silhouette.
                   3. NO gradients, no gray shadows, no 3D effects. 
                   4. Extremely clean edges. Simple, bold minimalist design.`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error generating pictogram:", error);
    return null;
  }
};