import Express from "express";
import Redis from "ioredis";

const app = Express();

const PORT = 3000;
const URL = "redis://localhost:6379";
const redis = new Redis(URL);

app.use(Express.json());

const ANNOUNCEMENT_KEY = "app:announcement";

app.post("/announcement", async (req, res) => {
  try {
    await redis.set(
      ANNOUNCEMENT_KEY,
      req.body.message || "20% off on all items.",
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
  }
});

app.get("/announcement", async (req, res) => {
  try {
    const announcement = await redis.get(ANNOUNCEMENT_KEY);
    res.json({ announcement });
  } catch (error) {
    console.error(error);
  }
});

app.get("/announcement/exists", async (req, res) => {
  try {
    const exists = await redis.exists(ANNOUNCEMENT_KEY);
    res.json({ exists: Boolean(exists), data: exists });
  } catch (error) {
    console.error(error);
  }
});

app.delete("/announcement", async (req, res) => {
  try {
    await redis.del(ANNOUNCEMENT_KEY);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})