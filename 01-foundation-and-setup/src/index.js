import Express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";

const app = Express();

const REDIS_URL = "redis://localhost:6379";
const PORT = 3000;

const redis = new Redis(REDIS_URL);

// redis conn
app.get("/redis", async (req, res) => {
  try {
    const result = await redis.ping();
    res.json({ redis: result });
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    res.status(500).json({ error: "Error connecting to Redis" });
  }
});

// mongo conn
app.get("/mongo", async (req, res) => {
  try {
    const url  = "mongodb://localhost:27017/redis-series";

    if(mongoose.connection.readyState === 0) {
        await mongoose.connect(url)
    }
    res.json({ mongo: "Connected to MongoDB", database: mongoose.connection.name });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ error: "Error connecting to MongoDB" });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})