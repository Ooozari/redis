import Express from "express";
import Redis from "ioredis";

const app = Express();

const PORT = 3000;
const URL = "redis://localhost:6379";
const redis = new Redis(URL);
const QUEUE_NAME = 'queue:emails'

app.use(Express.json());

// JSON
app.post("/emails", async (req, res) => {
    const job = {
        to: req.body.to,
        subject: req.body.subject,
        createdAt: new Date().toISOString(),
    }

    await redis.lpush(QUEUE_NAME, JSON.stringify(job))
    res.json({ queue: true, job});
})

app.get("/emails/process-one", async (req, res) => {
    const rawJob = await redis.rpop(QUEUE_NAME)
    if(!rawJob) return res.json({message: "No Job"})
    res.json({message: "Job executed. Email sent.", job: JSON.parse(rawJob)})  
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});