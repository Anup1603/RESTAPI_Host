const express = require("express");
const { getAllProducts, getAllProductsName, createNewProduct, selectById, updateProduct, deleteProduct, selectByPagination } = require("../controllers/products");

const router = express.Router();


router.route("/testing").get(selectByPagination);
router.route("/").get(getAllProducts);
router.route("/name").get(getAllProductsName);
router.route("/").post(createNewProduct);
router.route("/:id")
    .get(selectById)
    .patch(updateProduct)
    .delete(deleteProduct);



module.exports = router;