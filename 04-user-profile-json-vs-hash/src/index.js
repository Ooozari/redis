import Express from "express";
import Redis from "ioredis";

const app = Express();

const PORT = 3000;
const URL = "redis://localhost:6379";
const redis = new Redis(URL);

app.use(Express.json());

// JSON
app.post("/user/:id/profile-json", async (req, res) => {
    await redis.set(`user:${req.params.id}:profile-json`, JSON.stringify(req.body));
    res.json({ message: "Saved as JSON"});
})

app.get("/user/:id/profile-json", async (req, res) => {
    const result = await redis.get(`user:${req.params.id}:profile-json`);
    res.json({ message: "Fetch as JSON", data: result ? JSON.parse(result) : null });
})

// HASH
app.post("/user/:id/profile-hash", async (req, res) => {
    await redis.hset(`user:${req.params.id}:profile-json`, req.body); // no need for stringify
    res.json({ message: "Saved as HASH"});
})

app.get("/user/:id/profile-hash", async (req, res) => {
    await redis.hgetall(`user:${req.params.id}:profile-json`);
    res.json({ message: "Fetch as HASH"});
})

// hget -> single field from the object
app.get("/user/:id/profile-hash-single-field", async (req, res) => {
    const result = await redis.hget(`user:${req.params.id}:profile-json`, req.query.field);
    res.json({ message: "Fetch as HASH", data: result});
})

// hdel -> delete a single field
app.delete("/user/:id/profile-hash-single-field", async (req, res) => {
    // returns the counts 
    const result = await redis.hdel(`user:${req.params.id}:profile-json`, req.query.field);
    res.json({ message: "Field deleted", data: result});
})

// hexists -> field is available or not
app.get("/user/:id/profile-hash-field-exists", async (req, res) => {
    const result = await redis.hexists(`user:${req.params.id}:profile-json`, req.query.field);
    res.json({ message: "Field exists", data: result});
})

// HMGET -> hash multi get let u get multiple fields from an object
app.get("/user/:id/profile-hash-multi-field", async (req, res) => {
    const feildsToFetch = Array.isArray(req.body) ? req.body : [req.body];
    const result = await redis.hmget(`user:${req.params.id}:profile-json`, ...feildsToFetch);
    res.json({ message: "Fields Fetched", data: result});
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});