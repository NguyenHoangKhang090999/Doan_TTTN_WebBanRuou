var express = require("express");
var modelIndex = require("../models/model_index");
var modelUser = require("../models/model_user");
var modelProduct = require("../models/model_product");
var modelCatalog = require("../models/model_catalog");
var router = express.Router();

var breadcrumb = "Tất cả sản phẩm";

/* GET home page. */
router.get("/", async function (req, res, next) {
  let listCat = await modelIndex.listCat();
  let listRecent = await modelIndex.listRecent();
  let listNewArrival = await modelIndex.listNewArrival();
  res.render("site/trang-chu.ejs", {
    listCat: listCat,
    listNewArrival: listNewArrival,
    listRecent: listRecent,
  });
});

router.get("/san-pham", async function (req, res, next) {
  let listPro = await modelProduct.list(); //cách gọi hàm trong model, để có dữ liệu từ db
  let listProPopular = await modelProduct.list();
  let listCat = await modelCatalog.list();
  res.render("site/sanpham.ejs", {
    listPro: listPro,
    listCat: listCat,
    listProPopular: listProPopular,
    breadcrumb,
  });
});
router.get("/gio-hang/", async function (req, res, next) {
  let listPro = await modelProduct.list();
  res.render("site/gio-hang.ejs", { listPro: listPro });
});

router.get("/wishlist", async function (req, res, next) {
  let listPro = await modelProduct.hotProduct();
  res.render("site/wishlist.ejs", { listPro: listPro });
});
router.get("/lien-he", function (req, res, next) {
  res.render("site/lien-he.ejs");
});

module.exports = router;
