var db = require("./database"); //nhúng model database vào đế kết nối db
var itemCat = []; // biến để chứa dữ liệu đổ về cho controller
var dataList = [];
var dataListPro = [];

exports.list_Ruou_By_NCC = async (ten_ncc) => {
  return new Promise((hamOK, hamloi) => {
    let sql = `SELECT * FROM nhacungcap WHERE TENNCC = ${ten_ncc}`;
    db.query(sql, (err, result) => {
      console.log("Get idncc by tenncc success!!!");
      itemncc = result[0].MANCC;
    });
    let sql2 = `SELECT * FROM dongruou WHERE MALOAI=${itemncc}`;
    db.query(sql2, (err, result) => {
      console.log("Get list product by id ncc success");
      dataListPro = result;
      hamOK(dataListPro);
    });
  });
};
