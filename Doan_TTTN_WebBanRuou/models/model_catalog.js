var db = require("./database"); //nhúng model database vào đế kết nối db
var itemCat = []; // biến để chứa dữ liệu đổ về cho controller
var dataList = [];
var dataListPro = [];

// định nghĩa các hàm để tương tác vào mysql
exports.list = async () => {
  // let sql = "SELECT * FROM catalog";
  // let query = await db.query(sql, (err, result) => {
  //     console.log('Get List catalog success');
  //     dataList = result;
  // })
  // return dataList;
  return new Promise((hamOK, hamLoi) => {
    let sql = "SELECT * FROM loairuou";
    db.query(sql, (err, d) => {
      console.log("List success!!!");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listByName = async (nameCat) => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM loairuou WHERE TENLOAI='${nameCat}'`;
    db.query(sql, (err, result) => {
      console.log("Get idCat by nameCat success");
      itemCat = result[0].MALOAI;
    });
    let sql2 = `SELECT * FROM (SELECT * FROM dongruou WHERE MALOAI = ${itemCat})as d left join (SELECT ct.PHANTRAMGIAM,ct.MADONG as MD FROM ct_khuyenmai as ct,khuyenmai as km WHERE km.MAKM = ct.MAKM and km.NGAYBATDAU <= curdate() and km.NGAYKETTHUC >= curdate()) as km on km.MD = d.MADONG`;
    db.query(sql2, (err, result) => {
      console.log("Get list product by id Cat success");
      dataListPro = result;
      hamOK(dataListPro);
    });
  });
};
