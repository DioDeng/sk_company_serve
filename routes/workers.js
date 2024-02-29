var express = require("express");
var router = express.Router();
const WorkerControllers = require("../controllers/workers");
const handErrorAsync = require("../service/handErrorAsync");
const { isAdmin } = require("../middleware/auth");

router.get("/admin/workers", isAdmin, handErrorAsync(WorkerControllers.getWorkers));
router.post("/admin/worker", isAdmin, handErrorAsync(WorkerControllers.postWorker));
router.patch("/admin/worker", isAdmin, handErrorAsync(WorkerControllers.updateWorker));
router.delete("/admin/worker/:_id", isAdmin, handErrorAsync(WorkerControllers.deleteWorker));
router.get("/admin/workerList/:id", isAdmin, handErrorAsync(WorkerControllers.getWorkerList));


module.exports = router;