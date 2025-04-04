const router = require("express").Router();
const productController = require("../controllers/productController");
const upload = require("../utils/multer");

router.post("/", upload.single("image"), productController.createProduct);
router.get("/", productController.getAllProducts);
// router.get("/", getProducts);
// router.get("/:id", getProductById);
// router.put("/:id", upload.single("image"), updateProduct);
// router.delete("/:id", deleteProduct);

module.exports = router;
