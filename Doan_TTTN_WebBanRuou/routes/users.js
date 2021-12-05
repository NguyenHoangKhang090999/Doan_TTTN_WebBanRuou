var express = require("express");
var router = express.Router();
var db = require("../models/database");
var modelUser = require("../models/model_user");
var modelAdmin = require("../models/model_admin");
const bcrypt = require("bcrypt");
const { response } = require("express");

/* GET users listing. */
router.get("/tai-khoan", function (req, res, next) {
  if (req.session.User) {
    console.log("da nhan thong tin tai khoan");
    res.render("site/my-account.ejs", { user: req.session.User });
  } else {
    req.session.back = "/users/tai-khoan";
    res.redirect("/users/dang-nhap");
  }
});

router.get("/check-out", function (req, res, next) {
  if (req.session.User) {
    console.log("da nhan thong tin tai khoan");
    res.render("site/checkout.ejs", { user: req.session.User });
  } else {
    req.session.back = "/users/check-out";
    res.redirect("/users/dang-nhap");
  }
});

router.get("/dang-nhap", function (req, res, next) {
  res.render("site/dang-nhap.ejs");
});

router.get("/dang-nhap-admin", function (req, res, next) {
  res.render("site/dang-nhap-admin.ejs");
});

router.post("/dang-nhap-admin", function (req, res, next) {
  let u = req.body.username;
  let p = req.body.password;
  let sql = `SELECT * FROM NHANVIEN WHERE USERNAME = '${u}'`;
  db.query(sql, (err, rows) => {
    if (rows.length <= 0) {
      res.redirect("/users/dang-nhap-admin");
      return;
    }
    let user = rows[0];
    let pass_fromdb = user.PASSWORD;
    console.log(pass_fromdb);
    var kq = bcrypt.compareSync(p, pass_fromdb);
    console.log(kq);
    if (kq) {
      req.session.User = {
        id: user.MANV,
        username: user.USERNAME,
        ho: user.HO,
        ten: user.TEN,
        phone: user.SDT,
        email: user.EMAIL,
        address: user.DIACHI,
        sex: user.GIOITINH,
        birthday: user.NGAYSINH,
        logIn: true,
      };

      console.log(req.session.User);
      if (req.session.back) {
        console.log(req.session.back);
        res.redirect(req.session.back);
      } else {
        // if (user.MANQ === 3) {
        //   res.render("site/delivery.ejs", { user: req.session.User });
        // } else {
        //   res.render("site/admin.ejs", { user: req.session.User });
        // }
        res.render("site/delivery.ejs", { user: req.session.User });
      }
    } else {
      console.log("Not OK");
      let message = "Sai thong tin dang nhap!";
      res.redirect("/users/dang-nhap-admin");
    }
  });
});

router.post("/dang-nhap", function (req, res, next) {
  let u = req.body.username;
  let p = req.body.password;
  let sql = `SELECT * FROM KHACHHANG WHERE USERNAME = '${u}' OR EMAIL = '${u}'`;
  db.query(sql, (err, rows) => {
    if (rows.length <= 0) {
      res.redirect("/users/dang-nhap");
      return;
    }
    let user = rows[0];
    let pass_fromdb = user.PASSWORD;
    console.log(pass_fromdb);
    var kq = bcrypt.compareSync(p, pass_fromdb);
    console.log(kq);
    if (kq) {
      req.session.User = {
        id: user.MAKH,
        username: user.USERNAME,
        ho: user.HO,
        ten: user.TEN,
        phone: user.SDT,
        email: user.EMAIL,
        address: user.DIACHI,
        sex: user.GIOITINH,
        birthday: user.NGAYSINH,
        logIn: true,
      };

      console.log("OK");
      if (req.session.back) {
        console.log(req.session.back);
        res.redirect(req.session.back);
      } else {
        res.render("site/my-account.ejs");
      }
    } else {
      console.log("Not OK");
      res.render("site/dang-nhap.ejs");
    }
  });
});
router.get("/dang-ky", function (req, res, next) {
  res.render("site/dang-ky.ejs");
});
router.post("/luu", function (req, res, next) {
  let ho = req.body.ho;
  let ten = req.body.ten;
  let u = req.body.username;
  let em = req.body.email;
  let phone = req.body.phone;
  let sex = req.body.sex;
  let birthday = req.body.birthday;
  let p = req.body.password;
  let rp = req.body.retypePassword;
  let address = req.body.address;

  let sql1 = `SELECT * FROM khachhang ORDER BY MAKH DESC LIMIT 1`;
  db.query(sql1, (err, rows) => {
    var lastID = Number(rows[0].MAKH);
    lastID += 1;
    console.log(lastID);
    if (p === rp && p != "") {
      var salt = bcrypt.genSaltSync(10);
      var pass_mahoa = bcrypt.hashSync(p, salt);

      let user_info = {
        MAKH: lastID,
        HO: ho,
        TEN: ten,
        EMAIL: em,
        USERNAME: u,
        PASSWORD: pass_mahoa,
        SDT: phone,
        DIACHI: address,
        GIOITINH: sex,
        NGAYSINH: birthday,
        MANQ: 1,
      };

      let sql = "INSERT INTO khachhang SET ?";
      db.query(sql, user_info);
    } else {
      res.redirect("/users/dang-ky");
    }

    res.redirect("/users/thanh-cong");
  });
});

router.post("/update", function (req, res, next) {
  db.query(
    `UPDATE khachhang SET HO = '${req.body.ho}',TEN='${req.body.ten}',SDT='${req.body.phone}',EMAIL='${req.body.email}',DIACHI='${req.body.address}' WHERE MAKH='${req.session.User.id}'`,
    function (err) {
      if (err) throw err;
      let sql = `SELECT * FROM KHACHHANG WHERE MAKH='${req.session.User.id}'`;

      db.query(sql, (err, rows) => {
        let user = rows[0];
        console.log(user);
      });
      res.redirect("/users/tai-khoan");
    }
  );
});

router.get("/thanh-cong", function (req, res, next) {
  let message = "Đăng ký thành công";
  res.render("site/thanh-cong", { message: message });
});
router.get("/dang-xuat", function (req, res, next) {
  req.session.destroy();
  res.redirect("/users/dang-nhap");
});
router.post("/doi-mat-khau", function (req, res, next) {
  let password = req.body.password;
  let newPassword = req.body.newPassword;
  let confirmPassword = req.body.confirmPassword;
  let u = req.session.User.username;
  console.log(u);
  let sql = `SELECT * FROM khachhang WHERE USERNAME = '${u}'`;
  db.query(sql, (err, rows) => {
    if (rows.length <= 0) {
      res.redirect("/users/error");
      return;
    }
    let user = rows[0];
    let pass_fromdb = user.PASSWORD;
    var kq = bcrypt.compareSync(password, pass_fromdb);
    console.log(kq);
    if (kq) {
      if (newPassword === confirmPassword) {
        var salt = bcrypt.genSaltSync(10);
        var pass_mahoa = bcrypt.hashSync(newPassword, salt);
        let sql2 = `UPDATE khachhang SET PASSWORD='${pass_mahoa}' WHERE USERNAME ='${u}'`;
        db.query(sql2, (err, result) => {
          console.log("Update success");
          let mess = "Đổi mật khẩu thành công";
          res.render("site/thanh-cong.ejs", { message: mess });
        });
      }
    }
  });
});

router.get("/quen-mat-khau", (req, res) => {
  res.render("site/quen-mat-khau", { message: "" });
});
router.post("/quen-mat-khau", async (req, res) => {
  let email = req.body.email;
  let checkEmail = await modelUser.checkEmail(email); // Kiểm tra email có trong database hay không

  if (email == "") {
    let mess = "Mời bạn nhập email";
    res.render("site/quen-mat-khau", { message: mess });
  }
  if (checkEmail) {
    // Nếu email có trong database
    let mess = `Mật khẩu đã được gửi qua email ${email} của bạn!`;
    let newPassword = Math.random().toString(36).substring(7);

    var salt = bcrypt.genSaltSync(10);
    var pass_mahoa = bcrypt.hashSync(newPassword, salt);
    let sql = `UPDATE khachhang SET password='${pass_mahoa}' WHERE EMAIL='${email}' `;
    db.query(sql, (err, result) => {
      console.log("Update success");
    });

    var nodemailer = require("nodemailer"); // Nhúng module nodemailer để gửi password vào email của khách hàng

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: "lusionwine2021@gmail.com", pass: "Khang061114" }, // Email của người gửi
    });

    var mailOptions = {
      from: "lusionwine2021@gmail.com", //Email người gửi
      to: `${email}`, // Email người nhận
      subject: "Lấy lại mật khẩu",
      //text: 'Nội dung thư, không có code html'
      html: `Cửa hàng Lusion xin gửi lại mật khẩu của bạn. <br>
      Your password: <b style="padding: 3px 7px; background: #eee; color: red"> ${newPassword} </b>`, // Nội dung thư, có thể có code html
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) console.log(error);
      else console.log("Đã gửi mail: " + info.response);
      res.render("site/thanh-cong", { message: mess });
    });
  } else {
    let mess = "Email không tồn tại!";
    res.render("site/quen-mat-khau", { message: mess });
  }
});

//API
router.get("/api/all-nhacungcap", async function (req, res) {
  let data = await modelUser.listofNCC();
  res.json(data);
});

router.get("/api/all-order-User", async function (req, res) {
  let data = await modelAdmin.listOrderofUser(req.session.User.id);
  res.json(data);
});

router.get("/api/all-list-delivery", async function (req, res) {
  let data = await modelAdmin.listDeliveryStaff(req.session.User.id);
  res.json(data);
});
router.get("/api/all-list-delivery-finish", async function (req, res) {
  let data = await modelAdmin.listDeliveryStaffFinish(req.session.User.id);
  res.json(data);
});

module.exports = router;
