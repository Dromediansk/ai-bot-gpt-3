import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./router.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
