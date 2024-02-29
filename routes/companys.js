var express = require("express");
var router = express.Router();
const CompanyControllers = require("../controllers/companys");
const handErrorAsync = require("../service/handErrorAsync");
const { isAdmin } = require("../middleware/auth");

router.get("/admin/companys", isAdmin, handErrorAsync(CompanyControllers.getCompanys));
router.get("/admin/cooperateList/:id", isAdmin, handErrorAsync(CompanyControllers.getCooperateList));
router.post("/admin/company", isAdmin, handErrorAsync(CompanyControllers.postCompany));
router.patch("/admin/company", isAdmin, handErrorAsync(CompanyControllers.patchCompany));
router.delete("/admin/company/:_id", isAdmin, handErrorAsync(CompanyControllers.deleteCompany));


module.exports = router;