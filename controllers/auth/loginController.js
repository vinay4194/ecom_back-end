import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";
import { User } from "../../models";
import bcrypt from "bcrypt";

const loginController = {
	async login(req, res, next) {
		//Validate
		const loginSchema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});
		const { error } = loginSchema.validate(req.body);
		if (error) {
			//send error to erorHandler middleware
			return next(error);
		}
		//If No Error
		let access_token;
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				//Send to errorHandler middleware with custom message from CustomErrorHandler as parameter
				return next(CustomErrorHandler.invalidCredentials());
			}
			//check password
			const match = await bcrypt.compare(req.body.password, user.password);
			if (!match) {
				//Send to errorHandler middleware with custom message from CustomErrorHandler as parameter
				return next(CustomErrorHandler.invalidCredentials());
			}

			//Generate Token
			access_token = JwtService.sign({ _id: user._id, role: user.role });
		} catch (err) {
			return next(err);
		}
		res.json({ access_token: access_token });
	},
};

export default loginController;
