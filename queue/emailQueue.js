import { Worker } from "bullmq";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import dotenv from "dotenv";

dotenv.config();

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const sendEmail = async (email, subject, text) => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: { Data: text },
      },
      Subject: { Data: subject },
    },
    Source: process.env.SENDER_MAIL,
  };

  const command = new SendEmailCommand(params);
  return sesClient.send(command);
};

const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    try {
      const data = job.data;
      console.log("Job received:", job.id);
      console.log("Sending email...");
      await sendEmail(data.email, "Appointment Confirmation", data.text);
    } catch (err) {
      console.error("Error sending email:", err);
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      tls: {
        rejectUnauthorized: false,
      },
    },
    limiter: {
      max: 2,
      duration: 20 * 1000,
    },
  }
);

export default emailWorker;
