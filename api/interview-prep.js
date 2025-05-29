const openai = require("../../utils/openaiClient");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { schoolName, profileInfo } = req.body;

  const prompt = `
Generate 5 mock interview questions tailored to ${schoolName}’s mission and focus, using this applicant’s background:

${profileInfo}

Include tips on how to answer each question effectively.
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const questions = completion.data.choices[0].message.content;

    res.status(200).json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating interview prep" });
  }
}