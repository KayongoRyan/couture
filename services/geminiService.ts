import { GoogleGenerativeAI } from "@google/generative-ai";

// Helper to safely access environment variables in browser/node
const getApiKey = () => {
  try {
    // Check import.meta.env first (Vite)
    const meta = import.meta as any;
    if (meta && meta.env && meta.env.VITE_GEMINI_API_KEY) {
      return meta.env.VITE_GEMINI_API_KEY;
    }
    // Check process.env second (Node/Legacy)
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore errors
  }
  return undefined;
};

// Initialize the API client
const apiKey = getApiKey();
// We pass the key if it exists, otherwise the service handles the missing key gracefully inside the function
const genAI = new GoogleGenerativeAI(apiKey || 'dummy_key_for_init');

export const getStylingAdvice = async (productName: string): Promise<string> => {
  const currentKey = getApiKey();
  
  if (!currentKey) {
    return "Our AI Stylist is currently resting. Please try again later for personalized fashion advice.";
  }

  try {
    // Re-initialize with valid key
    const activeGenAI = new GoogleGenerativeAI(currentKey);
    
    const model = activeGenAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      You are a high-end fashion stylist for 'CoutureLaFleur', a luxury Rwandan-French fashion house.
      The brand essence is minimal, elegant, poetic, and deeply cultural.
      
      Give a 2-sentence poetic styling tip for the product: "${productName}".
      Suggest what occasion to wear it to and one accessory to pair it with.
      Tone: Sophisticated, whisper-quiet luxury.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "Elegance is the only beauty that never fades.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "True style whispers.";
  }
};