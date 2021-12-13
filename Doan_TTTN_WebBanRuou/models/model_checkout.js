var db = require("./database");
const crypto = require("crypto");

exports.createOrderDetail = (data) => {
  console.log(data);
  let cart = data.listCart;
  for (i = 0; i < cart.length; i++) {
    if (cart[i].PHANTRAMGIAM != null) {
      var GIA = (cart[i].GIA * (100 - cart[i].PHANTRAMGIAM)) / 100;
    } else {
      var GIA = cart[i].GIA;
    }
    db.query(
      `INSERT INTO ct_phieudat(MAPD,TRANGTHAI,MADONG,SOLUONG,GIA)
      VALUES('${data.id}','${data.TRANGTHAI}','${cart[i].MADONG}','${cart[i].quantity}','${GIA}')`,
      function (err) {
        if (err) throw err;
        console.log("THÀNH CÔNG!!!");
      }
    );
  }
};

exports.createOrder = (data) => {
  console.log(data);
  db.query(
    `INSERT INTO phieudat(MAPD,NGAYDAT,HONN,TENNN,DIACHINN,SDTNN,GHICHU,TRANGTHAI,MAKH,MAQUAN)
    VALUES('${data.id}','${data.NGAYDAT}','${data.HO}','${data.TEN}','${data.DIACHI}','${data.SDT}','${data.GHICHU}','${data.TRANGTHAI}','${data.MAKH}','${data.district}')`,
    function (err) {
      if (err) throw err;

      console.log("THÀNH CÔNG!!!");
    }
  );
};
