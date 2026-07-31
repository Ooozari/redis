import Express from "express";
import { emailQueue } from "./queue.js";
const app = Express();

const PORT = 3000;
app.use(Express.json());

app.post("/send-email", async (req, res) => {
  const { email } = req.body;
  const job = await emailQueue.add(
    "send-email",
    { email },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
    },
  );

  res.json({ message: "Email job added to the queue", jobId: job.id });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});