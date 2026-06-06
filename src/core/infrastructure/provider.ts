import { GoogleGenAI } from "@google/genai";
import type { Story } from "../domain/Story";
import { InferenceClient } from "@huggingface/inference";
import type { StoryParams } from "../domain/Provider";

export class AiStoryProvider {
  private genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_APP_GEMINI_API_KEY });
  private hf = new InferenceClient(import.meta.env.VITE_APP_HUGGINGFACE_API_KEY);

  constructor() {}

  public async generateStory(params: StoryParams): Promise<Story> {
    const keywords = params.keywords || "algo aleatorio para niños";

    const prompt = `Escribe un cuento infantil corto sobre ${keywords}. 
    El cuento no debe durar más de 1 minuto de lectura. 
    Responde estrictamente en formato JSON con estas claves: "title" y "content".
    La propiedad content debe contener el cuerpo formateado en HTML, con párrafos y sin saltos de línea.
  `;

    try {
      const result = await this.genAI.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
      });

      const text = result.text || "";

      const jsonText = text.replace(/```json|```/g, "").trim();
      const jsonResult: Story = JSON.parse(jsonText);

      const imageBlob = await this.hf.textToImage({
        model: "black-forest-labs/FLUX.1-schnell",
        inputs: jsonResult.content,
      });

      const imageUrl = URL.createObjectURL(imageBlob as unknown as Blob);

      const story: Story = {
        title: jsonResult.title,
        content: jsonResult.content,
        imageUrl: imageUrl,
      };

      return story;
    } catch (error) {
      return {
        title: "Error",
        content: "Lo siento, hubo un problema al crear tu cuento. Por favor intenta de nuevo.",
      };
    }
  }
}
