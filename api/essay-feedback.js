const openai = require("../../utils/openaiClient");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { essayText } = req.body;

  try {
    const prompt = `
You are an expert medical admissions advisor. Provide structured feedback on this personal statement:

"${essayText}"

Format your response as:
- Overall Impression
- Strengths
- Areas for Improvement
- Tone & Clarity
- Alignment with Med School Mission
    `;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const feedback = completion.data.choices[0].message.content;

    res.status(200).json({ feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting feedback" });
  }
}