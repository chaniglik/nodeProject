import express from "express";
import * as ordersController from "../controllers/orders.js";
import { auth, authAdmin } from "../middlewares/auth.js";

//המשמש להגדרה ולטפל בנתיבים ספציפיים בתוך אפליקציה.
const router = express.Router();

router.get("/", ordersController.getAllOrders)
router.get("/token",auth, ordersController.getUserOrdersByTokenId)
router.delete("/:id",auth, ordersController.deleteOrder)
router.post("/", auth, ordersController.addOrder)
router.put("/:id",authAdmin, ordersController.updateOrder)

export default router;
