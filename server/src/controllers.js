import openai from "./openai.js";

export const handlePrompt = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ status: 400, error: "Invalid request body!" });
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
};
