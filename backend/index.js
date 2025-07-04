const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Import CORS
const connectDB = require("./config/db");

const bookingRouter = require("./routes/bookingRouter");
const userRouter = require("./routes/userRouter");
const studioRouter = require("./routes/studioRouter");
const adminRouter = require("./routes/adminRouter");
const reviewRouter = require("./routes/reviewRouter");
const availabilityRouter = require("./routes/availabilityRouter");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://guileless-baklava-1da36e.netlify.app/",
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// API Routes
app.use("/booking", bookingRouter);
app.use("/user", userRouter);
app.use("/studio", studioRouter);
app.use("/admin", adminRouter);
app.use("/review", reviewRouter);
app.use("/availability", availabilityRouter);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
