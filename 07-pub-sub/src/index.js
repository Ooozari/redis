import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());
const publisher = new Redis('redis://localhost:6379');

app.post('/notification', async (req, res) => {
    const payload = {
        message: req.body.message,
        timestamp: new Date().toISOString(),
    }
    const receiver = await publisher.publish(
        'notification',
        JSON.stringify(payload),
    )

    res.json({
        message: `Message sent to ${receiver} subscribers.`,
    })
})

app.listen(3000, () => { 
    console.log('Server is running on port 3000');
})