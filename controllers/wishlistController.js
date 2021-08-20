import { User } from "../models";

const productController = {
	//Add to wishlist
	async add(req, res) {
		const { productId } = req.body;

		let userData = await User.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$push: { wishlist: req.body },
			}
		);

		res.status(201).json(userData);
	},

	//Remove from WishList
	async remove(req, res) {
		const { productId } = req.body;
		let userData = await User.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$pull: { wishlist: { productId: productId } },
			}
		);

		res.status(201).json({ message: "Product removed from Wishlist" });
	},
};
export default productController;
