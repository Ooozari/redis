# Redis Series Progress Summary (01 to 07)

## Overview
I built a 7-part Redis learning series using Node.js, Express, and ioredis. The goal was to learn how Redis works in real application scenarios and understand when to use different Redis data structures and patterns.

I am at a beginner-to-intermediate level in Redis and backend integration. I understand the fundamentals of setting up Redis, storing data in it, using expiry, queues, and pub/sub communication patterns, and I am now comfortable connecting Redis concepts to practical app flows.

---

## 01 - Foundation and Setup
Project: 01-foundation-and-setup

What I did:
- Set up a Node.js + Express app.
- Installed Redis client library: ioredis.
- Connected to Redis using redis://localhost:6379.
- Added a Redis health check endpoint: /redis.
- Connected to MongoDB and checked the database connection state.
- Built a minimal app that verifies both Redis and MongoDB are running locally.

What this taught me:
- How to initialize a Redis client.
- How to test connectivity to Redis and MongoDB.
- How a Node backend can integrate with multiple services.

---

## 02 - Announcement Bar API
Project: 02-announcement-bar-api

What I did:
- Built an Express API to manage a site announcement.
- Stored the current announcement in Redis under a fixed key: app:announcement.
- Implemented endpoints to:
  - POST /announcement: save a message
  - GET /announcement: read the message
  - GET /announcement/exists: check whether the key exists
  - DELETE /announcement: remove the announcement

Redis operations used:
- SET
- GET
- EXISTS
- DEL

What this taught me:
- Basic key-value storage in Redis.
- How to persist simple app configuration or feature flags.
- The difference between storing a value and checking whether it exists.

---

## 03 - OTP with TTL
Project: 03-otp-with-ttl

What I did:
- Created an OTP generation flow.
- Created a Redis key per phone number, such as otp:<phone>.
- Stored a 6-digit OTP in Redis.
- Used Redis TTL (time to live) to expire the OTP after 30 seconds.
- Implemented endpoints to:
  - POST /otp: create and store the OTP
  - POST /otp/verify: validate the OTP
  - GET /otp/:phone/ttl: check remaining time before expiration

Redis operations used:
- SET with EX option
- GET
- EXISTS
- DEL
- TTL

What this taught me:
- How to use Redis for temporary security data.
- Why TTL is useful for OTPs and short-lived tokens.
- How to verify and invalidate sensitive values after use.

---

## 04 - User Profile: JSON vs Hash
Project: 04-user-profile-json-vs-hash

What I did:
- Built a comparison between two Redis storage patterns for user profiles:
  - JSON string stored with SET
  - Hash stored with HSET
- Created endpoints to save and fetch profile data using both formats.
- Learned field-level access patterns using:
  - HGET
  - HGETALL
  - HDEL
  - HEXISTS
  - HMGET

Redis operations used:
- SET/GET for a JSON blob
- HSET/HGETALL for structured objects
- HGET for a single field
- HDEL for removing a field
- HEXISTS for checking a field
- HMGET for fetching multiple fields

What this taught me:
- When to use simple strings vs Redis hashes.
- Why hashes are better for object-like data with multiple fields.
- How Redis helps represent structured user/profile records efficiently.

---

## 05 - Email Queue
Project: 05-email-queue

What I did:
- Built a simple job queue using Redis lists.
- Added email jobs to a queue named queue:emails.
- Used LPUSH to add a job to the left side of the queue.
- Used RPOP to process one job at a time.
- Built endpoints to:
  - POST /emails: add a new email job
  - GET /emails/process-one: pop and process the next queued message

Redis operations used:
- LPUSH
- RPOP

What this taught me:
- The basics of queueing with Redis.
- How jobs can be queued and processed asynchronously.
- The difference between producer and consumer logic.

---

## 06 - Order Confirmation with BullMQ
Project: 06-order-confirmation-with-bullmq

What I did:
- Reimplemented the queue pattern using BullMQ, which is a production-grade queue library built on Redis.
- Split the app into:
  - api.js: API endpoint to add order/email jobs
  - queue.js: Queue configuration
  - worker.js: background worker that handles job execution
- Added jobs with retry behavior and exponential backoff.
- Simulated sending an email when a job is processed.

BullMQ concepts used:
- Queue
- Worker
- Job payload
- Retry attempts
- Exponential backoff

What this taught me:
- How real-world queue systems are structured.
- How Redis powers background jobs and asynchronous processing.
- Why BullMQ is more practical than manually using raw Redis lists for production workloads.

---

## 07 - Pub/Sub Messaging
Project: 07-pub-sub

What I did:
- Created a Redis Publish/Subscribe example.
- Built a publisher that sends a message to a channel called notification.
- Built a subscriber that listens to the same channel.
- Sent a JSON payload containing a message and timestamp.
- Logged the incoming message when the subscriber receives it.

Redis operations used:
- PUBLISH
- SUBSCRIBE
- message event handling

What this taught me:
- How pub/sub works in Redis for event-driven communication.
- How one service can notify multiple listeners without direct request/response calls.
- The use case for real-time notifications, alerts, and event streams.

---

## Overall Learning Outcome
By the end of the series, I built a solid practical understanding of Redis in a backend context.

I have worked with:
- Redis connection and health checks
- Key-value storage
- TTL-based expiration
- Hash data structures
- Lists for queueing
- Pub/Sub for event broadcasting
- BullMQ for robust asynchronous job processing

I have also practiced using Redis as a practical tool in Express-based Node applications, which is a valuable real-world workflow for backend developers.

---

## My Current Standing
I would describe my current standing as:
- Beginner to intermediate in Redis fundamentals
- Comfortable with basic Redis data structures and real backend use cases
- Able to build simple but meaningful Redis integrations in Node.js
- Still learning advanced patterns such as Redis persistence, caching strategies, clustering, and production-grade queue reliability

This is a solid foundation for moving into more advanced backend and distributed systems topics.

---
