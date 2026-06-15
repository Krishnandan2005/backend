import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Express app error: ", error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB CONNECTION FAILED !!!", error);
  });

// ========   FIRST APPROACH ==============
/*
import dotenv from "dotenv";
dotenv.config();
import {DB_NAME} from './constants.js';
import mongoose from "mongoose";
import express from "express";

const app = express();

// IIFE -- immediately invoked function (()=>{})()
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error",() => {
        console.log("Error: Database is not able to connect", error);
        throw error
    })

    app.listen(process.env.PORT, () => {
        console.log(`DataBase is Successfully Connected and App is listening on port ${process.env.PORT}`);
        
    })
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
})();
*/
