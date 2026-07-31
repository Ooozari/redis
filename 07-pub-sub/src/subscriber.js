import redis from 'ioredis';

const subscriber = new redis('redis://localhost:6379');

subscriber.subscribe('notification', (err, count) => {
    if(err){
        console.error('Failed to subscribe: %s', err.message); 
    }
    console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
})

// message is received as string 
subscriber.on('message', (channel, message) => {
    // parse message
    const payload = JSON.parse(message);
    console.log(`Received message on channel '${channel}': ${payload.message} at ${payload.timestamp}`);
});