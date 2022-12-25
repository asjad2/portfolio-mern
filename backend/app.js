import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./Routes/Routes.js";
import dotenv from "dotenv";

const app = express();
// app.get("/",(req,res)=>{
//   res.send("ssss")
// })

dotenv.config({ path: "./config.env" });

const url = process.env.DataBase;
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
mongoose.set("strictQuery", true);
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to the database."));

if (process.env.NODE_ENV === "production") {
}
app.use(express.static("frontend/build"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/portfolio", router);
