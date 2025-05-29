const openai = require("../../utils/openaiClient");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { gpa, mcat, schoolList, essayText, experienceSummary } = req.body;

  const prompt = `
You are a top-tier medical school admissions consultant.

Analyze the following application details:
GPA: ${gpa}
MCAT: ${mcat}
School List: ${schoolList}
Essay: ${essayText}
Experience Summary: ${experienceSummary}

Provide strategic feedback including:
- Strengths
- Weaknesses
- Suggested improvements
- Best-fit schools
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const analysis = completion.data.choices[0].message.content;

    res.status(200).json({ analysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error analyzing application" });
  }
}