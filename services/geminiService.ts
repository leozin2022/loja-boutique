
import { GoogleGenAI } from "@google/genai";

export async function generateProductDescription(productName: string, category: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Escreva uma descrição de luxo, curta e elegante para uma peça de roupa chamada "${productName}" da categoria "${category}". Use uma linguagem que atraia clientes de boutiques minimalistas. Máximo de 150 caracteres.`,
    });

    return response.text || "Uma peça exclusiva da nossa coleção minimalista.";
  } catch (error) {
    console.error("Erro na API Gemini:", error);
    return "Descrição sofisticada em breve.";
  }
}
