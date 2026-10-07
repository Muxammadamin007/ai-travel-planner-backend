const express = require("express");
const OpenAI = require("openai");

const router = express.Router();
const client = new OpenAI();

router.post("/plan", async (req, res) => {
  try {
    const {
      destination,
      budget,
      currency,
      days,
      interests,
      likes,
      dislikes,
      travelStyle,
    } = req.body;

    const prompt = `
Create a personalized travel plan.

Destination: ${destination}
Budget: ${budget} ${currency}
Duration: ${days} days
Interests: ${interests?.join(", ")}
Foods they like: ${likes?.join(", ")}
Foods they dislike: ${dislikes?.join(", ")}
Travel style: ${travelStyle}

Please provide:
1. A day-by-day itinerary
2. Estimated total cost
3. Budget breakdown for:
   - Hotel
   - Food
   - Transportation
   - Activities
   - Other
4. Recommended places based on the user's interests
5. Food recommendations based on likes and dislikes
6. Money-saving tips

Make sure the plan stays within the user's budget as much as possible.
`;

    const response = await client.responses.create({
      model: "gpt-6-luna",
      input: prompt,
    });

    res.json({
      success: true,
      plan: response.output_text,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create travel plan",
    });
  }
});

module.exports = router;