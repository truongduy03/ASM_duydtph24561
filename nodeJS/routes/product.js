import Express from "express";

import { showProduct, addProduct, productID, update, xoaProduct } from "../controllers/product.js";

const router = Express.Router();

router.get("/showProduct", showProduct);
router.get("/showProductID/:id", productID);
router.post("/addProduct", addProduct);
router.delete("/deleteUser/:id", xoaProduct);
router.patch("/updateUser/:id", update);

export default router;
