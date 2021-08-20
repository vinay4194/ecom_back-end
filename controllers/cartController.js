import { User } from "../models";

const cartController = {
	//Add to Cart
	async add(req, res) {
		try {
			User.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$push: { cart: req.body },
				}
			);
		} catch (error) {
			console.log(error);
		}

		res.status(201).json({ message: "Product added successfully" });
	},

	//Remove from Cart
	async remove(req, res) {
		const { productId } = req.body;
		let userData = await User.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$pull: { cart: { productId: productId } },
			}
		);

		res.status(201).json({ message: "Product removed from Cart" });
	},
};
export default cartController;
