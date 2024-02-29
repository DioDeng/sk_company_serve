var express = require("express");
var router = express.Router();
const OrderControllers = require("../controllers/orders");
const handErrorAsync = require("../service/handErrorAsync");
const { isAdmin } = require("../middleware/auth");

router.get("/admin/orders", isAdmin, handErrorAsync(OrderControllers.getOrders));
router.get("/admin/order/:id", isAdmin, handErrorAsync(OrderControllers.getOrder));
router.post("/admin/order", isAdmin, handErrorAsync(OrderControllers.postOrder));
router.patch("/admin/orderStatus", isAdmin, handErrorAsync(OrderControllers.patchOrderStatus));
router.patch("/admin/order", isAdmin, handErrorAsync(OrderControllers.patchOrder));
router.delete("/admin/order/:id", isAdmin, handErrorAsync(OrderControllers.deleteOrder));

module.exports = router;