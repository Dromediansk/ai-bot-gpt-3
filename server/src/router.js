import { Router } from "express";
import { handlePrompt } from "./controllers.js";

const router = Router();

// endpoints here
router.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from Codex" });
});
router.post("/prompt", handlePrompt);

export default router;
