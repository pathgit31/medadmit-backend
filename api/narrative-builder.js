const openai = require("../../utils/openaiClient");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const answers = req.body;

  const prompt = `
Based on the following introspective answers, create a compelling narrative for a medical school applicant's personal statement:

${JSON.stringify(answers)}

Make sure it is emotionally engaging, professional, and aligns with core values like empathy, service, curiosity, etc.
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const narrative = completion.data.choices[0].message.content;

    res.status(200).json({ narrative });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating narrative" });
  }
}