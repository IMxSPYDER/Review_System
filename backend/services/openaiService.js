import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

export async function analyzeReview(reviewText) {
  try {
    const response = await client.chat.send({
      model: "bytedance-seed/seed-1.6-flash", // the model you want
      messages: [
        {
          role: "system",
          content: "You are an expert customer feedback analyst. Produce detailed, multi-sentence JSON output."
        },
        {
          role: "user",
          content: `
Analyze this customer review:

"${reviewText}"

Return ONLY valid JSON in this format:

{
  "summary": "",
  "recommendedAction": "",
  "userResponse": ""
}

Rules:
- summary: minimum 40 words 
- recommendedAction: minimum 30 words
- userResponse: minimum 20 words, empathetic and professional, **without including customer names, your name, or email-style greetings**. Just write a normal thank-you and next steps in simple, natural language.

          `
        }
      ],
      max_output_tokens: 16000 // allows very long outputs
    });

    // The response text
    const output = response.choices?.[0]?.message?.content || "";
    console.log("RAW AI OUTPUT:", output);

    // Parse JSON safely
    try {
      return JSON.parse(output);
    } catch (err) {
      console.error("JSON parse error:", err);
      return { summary: "", recommendedAction: "", userResponse: "" };
    }

  } catch (err) {
    console.error("OpenRouter API error:", err);
    return { summary: "", recommendedAction: "", userResponse: "" };
  }
}
