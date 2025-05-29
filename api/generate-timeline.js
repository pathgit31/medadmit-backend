export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { appYear, currentStatus } = req.body;

  const timeline = [
    "Register for MCAT",
    "Submit AMCAS Primary Application",
    "Write Secondaries",
    "Interview Preparation",
    "Finalize Decisions"
  ];

  res.status(200).json({ timeline });
}