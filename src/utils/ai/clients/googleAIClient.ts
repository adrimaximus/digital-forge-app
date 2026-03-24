
/**
 * Google AI API client module
 * Handles the communication with Google AI API
 */

// Google AI Studio integration for business analysis
const GOOGLE_AI_API_KEY = "AIzaSyDqISqQr4Iy9eTCa1hj3m3U-0TR1BE3KxE";
// Updated API URL to use the correct gemini version
const GOOGLE_AI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export interface GoogleAIRequest {
  contents: {
    role: string;
    parts: {
      text: string;
    }[];
  }[];
  generationConfig?: {
    temperature?: number;
  };
}

export interface GoogleAIResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
  promptFeedback?: {
    blockReason?: string;
  };
}

export const callGoogleAI = async (prompt: string, creativityLevel: number = 0.7): Promise<string> => {
  try {
    console.log(`Making API request to Google AI with creativity level: ${creativityLevel}`);
    
    const requestBody: GoogleAIRequest = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      // Add temperature based on creativity level
      generationConfig: {
        temperature: creativityLevel
      }
    };

    console.log("Making API request to:", `${GOOGLE_AI_API_URL}?key=${GOOGLE_AI_API_KEY}`);
    
    const response = await fetch(`${GOOGLE_AI_API_URL}?key=${GOOGLE_AI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API response not OK:", response.status, errorText);
      throw new Error(`API response error: ${response.status}`);
    }

    const data: GoogleAIResponse = await response.json();
    console.log("Received response from Google AI");

    if (data.promptFeedback?.blockReason) {
      console.error("AI response blocked:", data.promptFeedback.blockReason);
      throw new Error(`Content blocked: ${data.promptFeedback.blockReason}`);
    }

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected API response format:", data);
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.error("Error calling Google AI API:", error);
    throw error;
  }
};
