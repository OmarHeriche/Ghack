//!importing : start
const cookieParcer=require('cookie-parser');
const express = require("express");
const emptyObject = new Object();
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler");
const connectDB = require("./db/connect");
require("express-async-errors");
const authenticationRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const auth = require("./middleware/authentication");

const cors=require('cors');
const xss=require('xss-clean');
const helmet=require('helmet');
// const rateLimiter=require('express-rate-limit');
const refreshToken = require("./middleware/refreshToken");
//todo start doing the swagger
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocument = yaml.load("./swagger.yaml");
//todo end doing the swagger
//!importing : end

const app = express();
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// );
app.use(cors()); //! first one
app.use(xss());
app.use(helmet());

app.use(express.json());
app.use(cookieParcer());

//! middlewares : start
app.get("/", (req, res) => {
  res.send(`<h1>HEY THERE</h1><a href="/api-docs">Go To API DOCS</a>`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/auth", authenticationRouter);
app.use("/api/v1/users", usersRouter);
app.use(refreshToken);
app.use(auth);
app.use("/api/v1/update", usersRouter);

//! middlewares : end

//! handling errors + other middlewares : start 
app.use(notFound);
app.use(errorHandlerMiddleWare);
//! handling errors + other middlewares : end

const port = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB(process.env.MONGO_URI); //todo please test it without the await
    app.listen(port, () => {
      console.log(`Server Is listening to the ${port} port...`);
    });
  } catch (error) {
    
  }
}
start();
