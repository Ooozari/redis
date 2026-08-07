import app from "./app.js";
import { connectDB } from "./config/db.js";
import { registerShutdownHandlers } from "./config/shutdown.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server is running at localhost:${PORT}`);
    });

    registerShutdownHandlers(server);
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
