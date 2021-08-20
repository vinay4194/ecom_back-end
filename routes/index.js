import express from "express";
const router = express.Router();
import { registerController, loginController, productController, wishlistController, cartController } from "../controllers";

router.post("/register", registerController.register);
router.post("/login", loginController.login);

//----product endpoints-------
router.post("/products", productController.store);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.destroy);
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getSingleProduct);

//----WishList endpoints-----
router.put("/wishlist_add/:id", wishlistController.add);
router.put("/wishlist_remove/:id", wishlistController.remove);

//-----Cart endpoints-----
router.put("/cart_add/:id", cartController.add);
router.put("/cart_remove/:id", cartController.remove);

export default router;
