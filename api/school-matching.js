export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { gpa, mcat, homeState, ethnicity, experiences, region, mission } = req.body;

  // Simulated matching logic based on AAMC-style data
  const schools = {
    reach: ["Harvard Medical School", "Johns Hopkins", "Stanford", "UPenn", "NYU"],
    target: ["UCSF", "Washington University", "Emory", "Case Western", "UNC"],
    safety: ["Texas Tech", "Oklahoma", "East Carolina", "Louisville", "Florida State"]
  };

  res.status(200).json(schools);
}