import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

//import routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js"

config();
connectDB();
const app = express();

//Body paring middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//API routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes)

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("unhandled Rejection error:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

//handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("uncaught exception error:", err);
  await disconnectDB();
  process.exit(1);
});

// gracefully handle SIGTERM signal to disconnect from the database before shutting down the server
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");

  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

//GET, POST, PUT, DELETE
