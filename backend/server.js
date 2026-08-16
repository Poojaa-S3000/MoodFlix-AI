import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

app.post("/recommend", async (req, res) => {
  try {
    const { mood, description } = req.body;

    const prompt = `
You are a movie recommendation assistant.

The user's mood is:
${mood}

The user says:
${description}

Recommend exactly 5 Hollywood movies that match the user's mood and description.

Return ONLY a JSON array containing exactly 5 movie titles.

Example:
[
  "Interstellar",
  "Inception",
  "The Martian",
  "Top Gun: Maverick",
  "Guardians of the Galaxy"
]

Do not include explanations.
Do not use markdown.
Do not include anything before or after the JSON array.
`;

    const completion = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let text = completion.choices?.[0]?.message?.content || "";

    console.log("AI RESPONSE:");
    console.log(text);

    // Remove markdown code blocks if the AI adds them
    text = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const movies = JSON.parse(text);

    if (!Array.isArray(movies) || movies.length === 0) {
      throw new Error("AI did not return a valid movie list");
    }

    res.json({
      movies: movies.slice(0, 5),
    });

  } catch (err) {
    console.error("ERROR:", err);

    res.status(500).json({
      error: "AI request failed",
      details: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("MoodFlix AI backend is running!");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});