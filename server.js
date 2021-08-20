import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";
const app = express();

//DB Connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
	console.log("DB Connected...");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Routes
app.use("/api", routes);
//for serving images from uploads folder
app.use("/uploads", express.static("uploads"));
//Middleware
app.use(errorHandler);
app.listen(APP_PORT, () => console.log(`Server running on Port: ${APP_PORT}`));
