import express, { json, urlencoded } from 'express';
const app = express();
// require('dotenv').config();
import dbConnect from './utils/connection.js';
import users from './routes/users.js';
import url from './routes/url.js';
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 4000
const allowedOrigins = /* process.env.ALLOWED_ORIGIN.split(",") ?? */ "https://shortner-frontend-k1lt.vercel.app,http://localhost:3000"

export const CORS_OPTIONS = {
  origin: function (origin, callback) {
    // Check if the request origin is allowed, otherwise, raise an error
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(CORS_OPTIONS));


//use json middleware
app.use(json());

//use encoded middleware 
app.use(urlencoded({ extended: true }));

//use cookie parser
app.use(cookieParser());

// connection from DataBase
dbConnect();

app.get("/", (_, re) => re.send("Hello"));
// User routes
app.use('/api/v1/user', users)

// Url's routes
app.use('/api/v1', url)

//custom Error Handler middleware
app.use(errorMiddleware)

app.listen(8000, () => console.log("Running"))

export default app;
