var express = require("express");
var router = express.Router();
var db = require("../models/database");
var model_checkout = require("../models/model_checkout");
var modelAdmin = require("../models/model_admin");
const { response } = require("express");
const { route, checkout } = require("./users");
const bodyParser = require("body-parser");
var qs = require("querystring");
const ejs = require("ejs");
var paypal = require("paypal-rest-sdk");
const crypto = require("crypto");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AchrnOrv5JdYVNGVvf8FY2NnIhdOH82NnN5LeJBVNm79e5doWusmj6GlVW-PXzhpjX8RdwVMs3DBmr8q",
  client_secret:
    "EHTuFPTnyZ33t5NKGYMf7e0EDPZ-mOeP75TYnPgXJWHBnSR6H-G02CBcxTs7cBmeEe1I7dIilM5s4AXD",
});

router.get("/paymentmethod", function (req, res, next) {
  res.render("site/paymentmethod.ejs");
});

router.post("/payment", async function (req, res) {
  let makh = req.body.makh;
  let currentdate = new Date();
  let ho = req.body.ho;
  let ten = req.body.ten;
  let sdt = req.body.sdt;
  let diachi = req.body.diachi;
  let ghichu = req.body.note;
  let cartarr = req.body.arrCart;
  let listCart = JSON.parse(cartarr);
  let id = makeid(10);
  let status = "Chưa duyệt";
  let datetime =
    currentdate.getFullYear() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getDate();
  data = {
    id: id,
    MAKH: makh,
    HO: ho,
    TEN: ten,
    SDT: sdt,
    GHICHU: ghichu,
    TRANGTHAI: status,
    DIACHI: diachi,
    NGAYDAT: datetime,
    listCart: listCart,
  };
  var item = [];
  total = 0;

  for (i = 0; i < data.listCart.length; i++) {
    if (data.listCart[i].PHANTRAMGIAM != null) {
      var GIA = (
        (data.listCart[i].GIA * (100 - data.listCart[i].PHANTRAMGIAM)) /
        100
      ).toFixed(2);
    } else {
      var GIA = data.listCart[i].GIA.toFixed(2);
    }

    total += GIA * data.listCart[i].quantity;

    item.push({
      name: data.listCart[i].TENDONG,
      sku: data.listCart[i].MADONG,
      price: GIA.toString(),
      currency: "USD",
      quantity: data.listCart[i].quantity,
    });
  }

  if (total > 200) {
    var shipping = 0;
  } else {
    var shipping = data.listCart.length * 2;
  }

  sub_total = total.toFixed(2);
  sub_total1 = total + shipping;
  sub_total2 = sub_total1.toFixed(2);

  console.log(item);
  console.log(sub_total);
  console.log(sub_total1);
  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/check-out/success",
      cancel_url: "http://localhost:3000/check-out/cancle",
    },
    transactions: [
      {
        item_list: {
          items: item,
        },
        amount: {
          currency: "USD",
          total: sub_total2.toString(),
          details: {
            subtotal: sub_total.toString(),
            shipping: shipping.toString(),
          },
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      for (i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

router.get("/index", function (req, res, next) {
  res.render("site/indexhanderbar.ejs");
});

router.get("/success", function (req, res, next) {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: sub_total2,
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        res.render("cancle");
      } else {
        console.log(JSON.stringify(payment));
        let query1 = model_checkout.createOrder(data);
        let query2 = model_checkout.createOrderDetail(data);
        const idbill = crypto.randomBytes(5).toString("hex");
        let query3 = modelAdmin.create_Bill(data.listCart, idbill, data.id);
        res.render("site/PaymentSuccess.ejs");
      }
    }
  );
});

router.post("/orderShipCode", async function (req, res) {
  let makh = req.body.makh;
  let currentdate = new Date();
  let ho = req.body.ho;
  let ten = req.body.ten;
  let sdt = req.body.sdt;
  let diachi = req.body.diachi;
  let ghichu = req.body.note;
  let cartarr = req.body.arrCart;
  let district = req.body.district;
  var listCart = JSON.parse(cartarr);
  let id = makeid(10);
  let status = "Chưa duyệt";
  let datetime =
    currentdate.getFullYear() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getDate();
  data2 = {
    id: id,
    MAKH: makh,
    HO: ho,
    TEN: ten,
    SDT: sdt,
    GHICHU: ghichu,
    TRANGTHAI: status,
    DIACHI: diachi,
    NGAYDAT: datetime,
    listCart: listCart,
  };
  console.log(data2);
  const idbill = crypto.randomBytes(5).toString("hex");
  db.query(
    `INSERT INTO phieudat(MAPD,NGAYDAT,HONN,TENNN,DIACHINN,SDTNN,GHICHU,TRANGTHAI,MAKH,MAQUAN)
    VALUES('${data2.id}','${data2.NGAYDAT}','${data2.HO}','${data2.TEN}','${data2.DIACHI}','${data2.SDT}','${data2.GHICHU}','${data2.TRANGTHAI}','${data2.MAKH}','${district}')`,
    function (err) {
      if (err) throw err;

      let query = model_checkout.createOrderDetail(data2);
      let query1 = modelAdmin.create_Bill(data2.listCart, idbill, data2.id);
      res.render("site/PaymentSuccess.ejs");
    }
  );
});

function makeid(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = router;
