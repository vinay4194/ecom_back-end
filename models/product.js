import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { APP_URL } from "../config";

const productSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		category: { type: String, required: true },
		size: { type: String},
		
	},
	{ timestamps: true, toJSON: { getters: true }, id: false }
);
export default mongoose.model("Product", productSchema, "products");
