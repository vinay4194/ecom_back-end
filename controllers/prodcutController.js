import { Product } from "../models";
import CustomErrorHandler from "../services/CustomErrorHandler";
import Joi from "joi";

const productController = {

	//---CREATE A PRODUCT---
	async store(req, res, next) {
			//Validate using Joi
			const productSchema = Joi.object({
				name: Joi.string().required(),
				price: Joi.number().required(),
				category: Joi.string().required(),
				size: Joi.string(),
				
			});
			const { error } = productSchema.validate(req.body);
			if (error) {
				return next(error);
			}
			const { name, price,category, size } = req.body;
			let document;
			try {
				document = await Product.create({
					name, 
					price, 
					category,
					size,
					
				});
			} catch (err) {
				return next(err);
			}
			res.status(201).json(document);
		
	},
	//---UPDATE A PRODUCT---
	async update(req, res, next) {
		
			//Validate
			const productSchema = Joi.object({
				name: Joi.string(),
				price: Joi.number(),
				category: Joi.string(),
				size: Joi.string()
				
			});
			const { error } = productSchema.validate(req.body);
			if (error) {
					return next(error);
			}
			//Send to database if No Errors
			let product =  await Product.findOne({_id:req.params.id})
			let { name, price,category, size } = req.body;

			//Update selected items, whose data is present in request body, others will remain unchanged
			!name?name=product.name:name=name
			!price?price=product.price:price=price
			!category?category=product.category:category=category
			!size?size=product.size:size=size
			
			let document;
			try {
				document = await Product.findOneAndUpdate(
					{ _id: req.params.id },
					{
						name,
						price, 
						category,
						size,
						
					},
					{ new: true }
				);
			} catch (err) {
				return next(err);
			}
			res.status(201).json(document);
	
	},
	//---DELETE A PRODUCT---
	async destroy(req, res, next) {
		const document = await Product.findOneAndRemove({ _id: req.params.id });
		if (!document) {
			return next(new Error("Nothing to delete"));
		}
		res.json({"message":"Deleted Successfully"});
	},
	//---GET ALL PRODUCTS---
	async getAllProducts(req, res, next) {
		let documents;
		try {
			documents = await Product.find().select("-updatedAt -__v");
		} catch (err) {
			return next(CustomErrorHandler.serverError());
		}
		res.json(documents);
	},
	//---GET SINGLE PRODUCT---
	async getSingleProduct(req, res, next) {
		let document;
		try {
			document = await Product.findOne({ _id: req.params.id }).select("-updatedAt -__v");
		} catch (err) {
			return next(CustomErrorHandler.serverError());
		}
		res.json(document);
	},
};
export default productController;
