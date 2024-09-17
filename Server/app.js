require("dotenv").config();
require('express-async-errors')
const express = require("express");
const app = express();
const port = 5000 || process.env.PORT;
const userRoute = require("./routes/User");
const jobRoute = require("./routes/Job");
const connectDB = require("./db/connectDB");
const authentication = require("./middleware/auth");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
//middleware
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(xss());

app.use("/api/v1/auth", userRoute); 
app.use("/api/v1/jobs", authentication, jobRoute);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
