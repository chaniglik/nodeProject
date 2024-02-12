import express from "express";
import * as productController from "../controllers/product.js";
import { auth, authAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", productController.getAllProduct)
router.get("/:id", productController.getProductById)
router.delete("/:id", authAdmin, productController.deleteProduct)
router.post("/", productController.addProduct)
router.put("/:id", authAdmin, productController.updateProduct)
export default router;
