import express from "express";
import * as productController from "../controllers/product.js";
import { auth, authAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", productController.getAllProduct)
router.get("/:id", productController.getProductById)
router.delete("/:id", productController.deleteProduct)
router.post("/", productController.addProduct)
router.put("/:id", productController.updateProduct)
export default router;
