import { Worker } from "bullmq";
import { connection } from "./queue.js";

const emailWorker = new Worker(
  "emails",
  // bussiness logic
  async (job) => {
    console.log(
      `Sending email to ${job.data.email}`,
      job.id,
      job.name,
      job.data,
    );
    (await new Promise((resolve) => setTimeout(resolve, 1500)),
      console.log(`Email sent to ${job.data.email}`));
  },
  { connection },
);

emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} has completed!`);
});

emailWorker.on("failed", (job, err) => {
  console.log(`Job ${job.id} has failed with ${err.message}`);
});
