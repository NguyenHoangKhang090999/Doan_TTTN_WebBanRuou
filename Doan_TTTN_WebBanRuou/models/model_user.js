var db = require("./database"); //nhúng model database vào đế kết nối db
var dataList = [];
exports.checkEmail = (email) => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM KHACHHANG WHERE EMAIL = '${email}'`;
    db.query(sql, (err, d) => {
      console.log("List success");
      data = d[0];
      hamOK(data);
    });
  });
};
exports.checkUsername = (username) => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM KHACHHANG WHERE USERNAME = '${username}'`;
    db.query(sql, (err, d) => {
      console.log("List success");
      data = d[0];
      hamOK(data);
    });
  });
};

exports.listofNCC = (username) => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM nhacungcap`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};
