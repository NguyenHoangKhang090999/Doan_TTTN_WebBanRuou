var express = require("express");
var router = express.Router();
var db = require("../models/database");
var modelAdmin = require("../models/model_admin");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
var model_checkout = require("../models/model_checkout");

router.get("/crud", function (req, res, next) {
  res.render("site/admin-crud.ejs", { user: req.session.User });
});

router.get("/map", function (req, res, next) {
  res.render("site/delivery-map.ejs");
});

router.get("/Bill", function (req, res, next) {
  res.render("site/BillPayment.ejs");
});

router.get("/import_product", function (req, res, next) {
  res.render("site/importproduct.ejs");
});

router.get("/Report_revenu/:year", function (req, res, next) {
  let year = req.params.year;
  res.render("site/Report_revenu.ejs", { year: year, user: req.session.User });
});

router.get("/Report_QuantityInStock", function (req, res, next) {
  res.render("site/Report_QuantityInStock.ejs", { user: req.session.User });
});
router.get(
  "/Report_Product_Sold_PDF/:lm/:datefrom/:dateto/:datefrom1/:dateto1",
  function (req, res, next) {
    let lm = req.params.lm;
    let datefrom = req.params.datefrom;
    let dateto = req.params.dateto;
    let datefrom1 = req.params.datefrom1;
    let dateto1 = req.params.dateto1;
    res.render("site/product-sold-pdf.ejs", {
      user: req.session.User,
      lm: lm,
      datefrom: datefrom,
      dateto: dateto,
      datefrom1: datefrom1,
      dateto1: dateto1,
    });
  }
);

//quan li nha cung cap
router.post("/addncc", function (req, res, next) {
  db.query(
    `INSERT INTO nhacungcap (MANCC,TENNCC,DIACHI,EMAIL,SDT)
    VALUES('${req.body.mancc}','${req.body.ten}','${req.body.diachi}','${req.body.email}','${req.body.sdt}')`,
    function (err) {
      if (err) {
        throw err;
      }

      res.redirect("/quan-tri/crud");
    }
  );
});

router.get("/delete/:id", function (req, res, next) {
  db.query(
    `DELETE FROM nhacungcap WHERE MANCC=${req.params.id}`,
    function (err) {
      if (err) throw err;
      res.redirect("/quan-tri/crud");
    }
  );
});

router.get("/edit/:id", function (req, res, next) {
  var data = db.query(
    `SELECT * FROM nhacungcap WHERE MANCC=${req.params.id}`,
    function (err, result) {
      if (err) throw err;
      data = {
        MANCC: result[0].MANCC,
        TENNCC: result[0].TENNCC,
        DIACHI: result[0].DIACHI,
        EMAIL: result[0].EMAIL,
        SDT: result[0].SDT,
      };
      res.render("site/edit-ncc.ejs", { data });
    }
  );
});

router.post("/edit", function (req, res, next) {
  db.query(
    `UPDATE nhacungcap SET TENNCC='${req.body.name}',DIACHI='${req.body.address}',EMAIL='${req.body.email}',SDT='${req.body.phone}' WHERE MANCC='${req.body.id}' `,
    function (err) {
      if (err) throw err;

      res.redirect("/quan-tri/crud");
    }
  );
});

//quan li loai san pham
router.post("/addloai", function (req, res, next) {
  db.query(
    `INSERT INTO loairuou (MALOAI,TENLOAI)
    VALUES('${req.body.id}','${req.body.ten}')`,
    function (err) {
      if (err) throw err;

      res.redirect("/quan-tri/crud");
    }
  );
});

router.get("/deleteloai/:id", function (req, res, next) {
  db.query(
    `DELETE FROM loairuou WHERE maloai='${req.params.id}'`,
    function (err) {
      if (err) throw err;
      res.redirect("/quan-tri/crud");
    }
  );
});

router.get("/editloai/:id", function (req, res, next) {
  var data = db.query(
    `SELECT * FROM loairuou WHERE maloai=${req.params.id}`,
    function (err, result) {
      if (err) throw err;
      data = {
        MALOAI: result[0].MALOAI,
        TENLOAI: result[0].TENLOAI,
      };
      res.render("site/edit-loaisp.ejs", { data });
    }
  );
});

router.post("/editloai", function (req, res, next) {
  db.query(
    `UPDATE loairuou SET TENLOAI='${req.body.name}' WHERE MALOAI='${req.body.id}'`,
    function (err) {
      if (err) throw err;

      res.redirect("/quan-tri/crud");
    }
  );
});

//quan li thuong hieu
router.post("/addth", function (req, res, next) {
  db.query(
    `INSERT INTO thuonghieu (MATH,TENTH)
    VALUES('${req.body.id}','${req.body.ten}')`,
    function (err) {
      if (err) throw err;

      res.redirect("/quan-tri/crud");
    }
  );
});

router.get("/deleteth/:id", function (req, res, next) {
  db.query(
    `DELETE FROM thuonghieu WHERE MATH='${req.params.id}'`,
    function (err) {
      if (err) throw err;
      res.redirect("/quan-tri/crud");
    }
  );
});

router.get("/editth/:id", function (req, res, next) {
  var data = db.query(
    `SELECT * FROM thuonghieu WHERE MATH=${req.params.id}`,
    function (err, result) {
      if (err) throw err;
      data = {
        MATH: result[0].MATH,
        TENTH: result[0].TENTH,
      };
      res.render("site/edit-thuonghieu.ejs", { data });
    }
  );
});

router.post("/editth", function (req, res, next) {
  db.query(
    `UPDATE thuonghieu SET TENTH='${req.body.name}' WHERE MATH='${req.body.id}'`,
    function (err) {
      if (err) throw err;

      res.redirect("/quan-tri/crud");
    }
  );
});

//quan tri san pham
router.post("/addsp", function (req, res, next) {
  db.query(
    `INSERT INTO dongruou (MADONG,TENDONG,GIA,HINHANH,MOTA,MALOAI,MATH)
    VALUES('${req.body.id}','${req.body.name}','${req.body.price}','img/${req.body.image}','${req.body.des}','${req.body.maloai}','${req.body.math}')`,
    function (err) {
      if (err) throw err;
      res.redirect("/quan-tri/crud");
    }
  );
});

router.get("/deletesp/:id", function (req, res, next) {
  db.query(
    `DELETE FROM dongruou WHERE MADONG=${req.params.id}`,
    function (err) {
      if (err) throw err;
      res.redirect("/quan-tri/crud");
    }
  );
});

router.get("/deletespkm/:id", function (req, res, next) {
  db.query(
    `DELETE FROM ct_khuyenmai WHERE MADONG=${req.params.id}`,
    function (err) {
      if (err) throw err;
      res.redirect("/quan-tri/crud");
    }
  );
});

router.get("/editsp/:id", function (req, res, next) {
  var data = db.query(
    `SELECT dongruou.MADONG,dongruou.TENDONG,dongruou.GIA,dongruou.TRANGTHAI,dongruou.HINHANH,dongruou.MOTA,dongruou.CHITIET,dongruou.SOLUONGTON,dongruou.MALOAI,dongruou.MATH,loairuou.TENLOAI,thuonghieu.TENTH FROM dongruou,loairuou,thuonghieu WHERE dongruou.MALOAI = loairuou.MALOAI and thuonghieu.MATH = dongruou.MATH and dongruou.MADONG='${req.params.id}'`,
    function (err, result) {
      if (err) throw err;
      data = {
        MADONG: result[0].MADONG,
        TENDONG: result[0].TENDONG,
        GIA: result[0].GIA,
        TENLOAI: result[0].TENLOAI,
        TENTH: result[0].TENTH,
        TRANGTHAI: result[0].TRANGTHAI,
        HINHANH: result[0].HINHANH,
        MOTA: result[0].MOTA,
        CHITIET: result[0].CHITIET,
        MALOAI: result[0].MALOAI,
        MATH: result[0].MATH,
      };
      res.render("site/edit-sanpham.ejs", { data });
    }
  );
});

router.get("/nhaphang/:id", function (req, res, next) {
  var data = db.query(
    `SELECT dongruou.MADONG,dongruou.TENDONG,dongruou.GIA,dongruou.TRANGTHAI,dongruou.HINHANH,dongruou.MOTA,dongruou.CHITIET,dongruou.SOLUONGTON,dongruou.MALOAI,dongruou.MATH,loairuou.TENLOAI,thuonghieu.TENTH FROM dongruou,loairuou,thuonghieu WHERE dongruou.MALOAI = loairuou.MALOAI and thuonghieu.MATH = dongruou.MATH and dongruou.MADONG='${req.params.id}'`,
    function (err, result) {
      if (err) throw err;
      data = {
        MADONG: result[0].MADONG,
        TENDONG: result[0].TENDONG,
        GIA: result[0].GIA,
        TENLOAI: result[0].TENLOAI,
        TENTH: result[0].TENTH,
        TRANGTHAI: result[0].TRANGTHAI,
        HINHANH: result[0].ANH,
        MOTA: result[0].MOTA,
        CHITIET: result[0].CHITIET,
        MALOAI: result[0].MALOAI,
        MATH: result[0].MATH,
      };
      res.render("site/edit-sanpham.ejs", { data });
    }
  );
});

router.post("/editsp", function (req, res, next) {
  db.query(
    `UPDATE dongruou SET TENDONG='${req.body.name}',GIA='${req.body.price}',TRANGTHAI='${req.body.status}',MOTA ='${req.body.des}',CHITIET='${req.body.detail}',HINHANH='img/${req.body.image}',MALOAI='${req.body.maloai}',MATH='${req.body.math}' WHERE MADONG='${req.body.id}'`,
    function (err) {
      if (err) throw err;
      res.redirect("/quan-tri/crud");
    }
  );
});

//quan tri khach hang
// router.post("/addkh", function (req, res, next) {
//   db.query(
//     `INSERT INTO khachhang (MADONG,TENDONG,GIA,TRANGTHAI,HINHANH,MOTA,MALOAI,MATH)
//     VALUES('${req.body.id}','${req.body.name}','${req.body.price}','${req.body.status}','${req.body.image}','${req.body.des}','${req.body.maloai}','${req.body.math}')`,
//     function (err) {
//       if (err) throw err;

//       res.redirect("/quan-tri/crud");
//     }
//   );
// });

router.get("/deletekh/:id", function (req, res, next) {
  db.query(`DELETE FROM khachhang WHERE MAKH=${req.params.id}`, function (err) {
    if (err) throw err;
    res.redirect("/quan-tri/crud");
  });
});

router.get("/editkh/:id", function (req, res, next) {
  var data = db.query(
    `SELECT * FROM khachhang WHERE MAKH=${req.params.id}`,
    function (err, result) {
      if (err) throw err;
      data = {
        MAKH: result[0].MAKH,
        HO: result[0].HO,
        TEN: result[0].TEN,
        GIOITINH: result[0].GIOITINH,
        NGAYSINH: result[0].NGAYSINH,
        DIACHI: result[0].DIACHI,
        EMAIL: result[0].EMAIL,
        SDT: result[0].SDT,
      };
      res.render("site/edit-khachhang.ejs", { data });
    }
  );
});

router.post("/editkh", function (req, res, next) {
  db.query(
    `UPDATE khachhang SET HO='${req.body.surname}',TEN='${req.body.name}',GIOITINH='${req.body.sex}',NGAYSINH='${req.body.birthday}',DIACHI='${req.body.address}',EMAIL='${req.body.email}',SDT='${req.body.phone}' WHERE MAKH='${req.body.id}'`,
    function (err) {
      if (err) throw err;

      res.redirect("/quan-tri/crud");
    }
  );
});

//quan tri nhan vien
router.post("/addnhanvien", function (req, res, next) {
  // var salt = bcrypt.genSaltSync(10);
  // var pass_mahoa = bcrypt.hashSync(req.body.password, salt);
  db.query(
    `INSERT INTO nhanvien (MANV,HO,TEN,GIOITINH,NGAYSINH,DIACHI,SDT,EMAIL,USERNAME,PASSWORD,MANQ)
    VALUES('${req.body.id}','${req.body.surname}','${req.body.name}','${req.body.sex}','${req.body.birthday}','${req.body.address}','${req.body.phone}','${req.body.email}','${req.body.username}','$2b$10$oKtXatoymFV2vGG9SvDhVOnkDlZ4aRTyJnzW/lvvuq6XMXLAM/D4u','1')`,
    function (err) {
      if (err) throw err;
      res.redirect("/quan-tri/crud");
    }
  );
});

router.get("/deletenv/:id", function (req, res, next) {
  db.query(`DELETE FROM nhanvien WHERE MANV=${req.params.id}`, function (err) {
    if (err) throw err;
    res.redirect("/quan-tri/crud");
  });
});

router.get("/editnv/:id", function (req, res, next) {
  var data = db.query(
    `SELECT * FROM nhanvien WHERE MANV=${req.params.id}`,
    function (err, result) {
      if (err) throw err;
      data = {
        MANV: result[0].MANV,
        HO: result[0].HO,
        TEN: result[0].TEN,
        GIOITINH: result[0].GIOITINH,
        NGAYSINH: result[0].NGAYSINH,
        DIACHI: result[0].DIACHI,
        EMAIL: result[0].EMAIL,
        SDT: result[0].SDT,
      };
      res.render("site/edit-nhanvien.ejs", { data });
    }
  );
});

router.post("/editnv", function (req, res, next) {
  db.query(
    `UPDATE nhanvien SET HO='${req.body.surname}',TEN='${req.body.name}',GIOITINH='${req.body.sex}',NGAYSINH='${req.body.birthday}',DIACHI='${req.body.address}',EMAIL='${req.body.email}',SDT='${req.body.phone}' WHERE MANV='${req.body.id}'`,
    function (err) {
      if (err) throw err;

      res.redirect("/quan-tri/crud");
    }
  );
});

//quan tri khuyen mai
router.get("/deletekm/:id", function (req, res, next) {
  db.query(`DELETE FROM khuyenmai WHERE MAKM=${req.params.id}`, function (err) {
    if (err) throw err;
    res.redirect("/quan-tri/crud");
  });
});

router.get("/addkm", function (req, res, next) {
  res.render("site/addkhuyenmai.ejs", { user: req.session.User });
});

router.post("/addkm", function (req, res, next) {
  db.query(
    `INSERT INTO khuyenmai (MAKM,TENKM,NGAYBATDAU,NGAYKETTHUC,LIDO,MANV)
    VALUES('${req.body.id}','${req.body.name}','${req.body.start}','${req.body.end}','${req.body.reason}','${req.body.manv}')`,
    function (err) {
      if (err) throw err;

      res.redirect("/quan-tri/crud");
    }
  );
});

router.get("/editkm/:id", function (req, res, next) {
  var data = db.query(
    `SELECT * FROM khuyenmai WHERE MAKM=${req.params.id}`,
    function (err, result) {
      if (err) throw err;
      data = {
        MAKM: result[0].MAKM,
        TENKM: result[0].TENKM,
        NGAYBATDAU: result[0].NGAYBATDAU,
        NGAYKETTHUC: result[0].NGAYKETTHUC,
        LIDO: result[0].LIDO,
      };
      res.render("site/edit-khuyenmai.ejs", { data });
    }
  );
});

router.post("/editkm", function (req, res, next) {
  db.query(
    `UPDATE khuyenmai SET TENKM='${req.body.name}',NGAYBATDAU='${req.body.start}',NGAYKETTHUC='${req.body.end}',LIDO='${req.body.reason}' WHERE MAKM='${req.body.id}'`,
    function (err) {
      if (err) throw err;

      res.redirect("/quan-tri/crud");
    }
  );
});

router.get("/them_sp_km/:id", function (req, res, next) {
  var data = db.query(
    `SELECT * FROM khuyenmai WHERE MAKM=${req.params.id}`,
    function (err, result) {
      if (err) throw err;
      data = {
        MAKM: result[0].MAKM,
        TENKM: result[0].TENKM,
        NGAYBATDAU: result[0].NGAYBATDAU,
        NGAYKETTHUC: result[0].NGAYKETTHUC,
        LIDO: result[0].LIDO,
      };
      res.render("site/addkmchosp.ejs", { data });
    }
  );
});

router.post("/them_sp_km", function (req, res, next) {
  db.query(
    `INSERT INTO ct_khuyenmai(MAKM,MADONG,PHANTRAMGIAM)
    VALUES('${req.body.id}','${req.body.idproduct}','${req.body.percent}')`,
    function (err) {
      if (err) throw err;

      res.redirect("/quan-tri/crud");
    }
  );
});

//quan-tri don hang

router.get("/review_order/:id", function (req, res, next) {
  var data = db.query(
    `SELECT * FROM(SELECT ct.MAPD,count(ct.MAPD)as sl,sum(ROUND(ct.GIA*ct.SOLUONG,2))as subtotal  FROM ct_phieudat as ct WHERE ct.MAPD='${req.params.id}') as sl
    inner join (SELECT pd.MAPD,pd.HONN,pd.TENNN,pd.DIACHINN,pd.SDTNN,pd.NGAYDAT,pd.TRANGTHAI,ct.MADONG as MD,d.TENDONG,d.HINHANH,ct.SOLUONG,ROUND(ct.GIA,2) as GIA,hd.THANHTIEN,ROUND(ct.GIA*ct.SOLUONG,2) as TONG,nv.HO as HONVGH,nv.TEN as TENNVGH,pd.GHICHU
    FROM phieudat as pd,ct_phieudat as ct,dongruou as d,hoadon as hd,nhanvien as nv 
    WHERE pd.MAPD = ct.MAPD and nv.MANV = pd.MANVGH and d.MADONG=ct.MADONG and pd.MAPD = '${req.params.id}' and hd.MAPD = pd.MAPD) as ct on sl.MAPD = ct.MAPD`,
    function (err, result) {
      if (err) throw err;
      data = result;
      console.log(data);
      res.render("site/reviewOrder.ejs", { data });
    }
  );
});

router.get("/review_order_not/:id", function (req, res, next) {
  var data = db.query(
    `SELECT * FROM(SELECT ct.MAPD,count(ct.MAPD)as sl,sum(ROUND(ct.GIA*ct.SOLUONG,2))as subtotal  FROM ct_phieudat as ct WHERE ct.MAPD='${req.params.id}') as sl
    inner join (SELECT pd.MAPD,pd.HONN,pd.TENNN,pd.DIACHINN,pd.SDTNN,pd.NGAYDAT,pd.TRANGTHAI,ct.MADONG as MD,d.TENDONG,d.HINHANH,ct.SOLUONG,ROUND(ct.GIA,2) as GIA,hd.THANHTIEN,ROUND(ct.GIA*ct.SOLUONG,2) as TONG,pd.GHICHU
    FROM phieudat as pd,ct_phieudat as ct,dongruou as d,hoadon as hd
    WHERE pd.MAPD = ct.MAPD and d.MADONG=ct.MADONG and pd.MAPD = '${req.params.id}' and hd.MAPD = pd.MAPD) as ct on sl.MAPD = ct.MAPD`,
    function (err, result) {
      if (err) throw err;
      data = result;
      console.log(data);
      res.render("site/reviewOrdernot.ejs", { data });
    }
  );
});

//Xem hoa don
router.get("/Bill/:id", function (req, res, next) {
  var data = db.query(
    `SELECT * FROM(SELECT ct.MAPD as PD,count(ct.MAPD)as sl,ROUND(sum(ct.GIA*ct.SOLUONG),2) as subtotal  
    FROM ct_phieudat as ct 
    WHERE ct.MAPD='${req.params.id}') as sl
    inner join
    (SELECT * FROM(SELECT hd.MAPD,hd.MAHD,hd.MASOTHUE,DATE_FORMAT(hd.NGAY, '%D %M %Y') as NGAY,hd.THANHTIEN,hd.MANV,pd.DIACHINN,nv.HO as honv,nv.TEN as tennv,kh.HO,kh.TEN 
    FROM hoadon as hd,phieudat as pd,nhanvien as nv,khachhang as kh 
    WHERE pd.MAPD = hd.MAPD and nv.MANV = hd.MANV and kh.MAKH = pd.MAKH) as hd 
    inner join 
    (SELECT ct.MAPD as PD,ct.SOLUONG,ct.GIA,ROUND(ct.GIA*ct.SOLUONG,2) as TONG,d.TENDONG,d.HINHANH  FROM ct_phieudat as ct,dongruou as d 
    WHERE d.MADONG = ct.MADONG) as ct on ct.PD = hd.MAPD WHERE ct.PD='${req.params.id}') as ct on ct.MAPD = sl.PD`,
    function (err, result) {
      if (err) throw err;
      data = result;
      console.log(data);
      res.render("site/BillPayment.ejs", { data });
    }
  );
});

//duyet don hang
router.post("/confirm_order", async function (req, res, next) {
  let data = await modelAdmin.listOrderDetailById(req.body.iddonhang);
  const idbill = crypto.randomBytes(5).toString("hex");
  db.beginTransaction(function (err) {
    if (err) throw err;
    //Thực thi câu lệnh thứ 1
    db.query(
      `UPDATE phieudat SET TRANGTHAI='Đã phân công',MANVD='${req.body.idnvd}',MANVGH='${req.body.idnvgh}',MAHD='${idbill}' WHERE MAPD='${req.body.iddonhang}'`,
      function (err, results) {
        //nếu có lỗi
        if (err) {
          //rollback quá trình
          return db.rollback(function () {
            throw err;
          });
        }
        //Thực thi câu lệnh thứ 2
        db.query(
          `UPDATE ct_phieudat SET TRANGTHAI='Đã phân công' WHERE MAPD='${req.body.iddonhang}'`,
          function (err) {
            //Nếu lỗi thì
            if (err) {
              //rollback transaction
              return db.rollback(function () {
                throw err;
              });
            }
            //commit
            db.commit(function (err) {
              //nếu commit lỗi
              if (err) {
                //rollback transaction
                return db.rollback(function () {
                  throw err;
                });
              }
              //tao hoa don..
              let query = modelAdmin.createBill(
                data,
                req.body.idnvd,
                req.body.iddonhang
              );

              Mailer();

              res.redirect("/quan-tri/crud");
            });
          }
        );
      }
    );
  });
});

router.get("/CompleteOrder/:id", function (req, res, next) {
  db.beginTransaction(function (err) {
    if (err) throw err;
    //Thực thi câu lệnh thứ 1
    db.query(
      `UPDATE phieudat SET TRANGTHAI='Đã giao' WHERE MAPD='${req.params.id}'`,
      function (err, results) {
        //nếu có lỗi
        if (err) {
          //rollback quá trình
          return db.rollback(function () {
            throw err;
          });
        }
        //Thực thi câu lệnh thứ 2
        db.query(
          `UPDATE ct_phieudat SET TRANGTHAI='Đã giao' WHERE MAPD='${req.params.id}'`,
          function (err) {
            //Nếu lỗi thì
            if (err) {
              //rollback transaction
              return db.rollback(function () {
                throw err;
              });
            }
            //commit
            db.commit(function (err) {
              //nếu commit lỗi
              if (err) {
                //rollback transaction
                return db.rollback(function () {
                  throw err;
                });
              }
              res.redirect("/quan-tri/crud");
            });
          }
        );
      }
    );
  });
});

router.get("/CancleOrder/:id", function (req, res, next) {
  db.beginTransaction(function (err) {
    if (err) throw err;
    //Thực thi câu lệnh thứ 1
    db.query(
      `UPDATE phieudat SET TRANGTHAI='Đã hủy' WHERE MAPD='${req.params.id}'`,
      function (err, results) {
        //nếu có lỗi
        if (err) {
          //rollback quá trình
          return db.rollback(function () {
            throw err;
          });
        }
        //Thực thi câu lệnh thứ 2
        db.query(
          `UPDATE ct_phieudat SET TRANGTHAI='Đã hủy' WHERE MAPD='${req.params.id}'`,
          function (err) {
            //Nếu lỗi thì
            if (err) {
              //rollback transaction
              return db.rollback(function () {
                throw err;
              });
            }
            //commit
            db.commit(function (err) {
              //nếu commit lỗi
              if (err) {
                //rollback transaction
                return db.rollback(function () {
                  throw err;
                });
              }
              res.redirect("/users/tai-khoan");
            });
          }
        );
      }
    );
  });
});

async function Mailer() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "lusionwine2021@gmail.com", // generated ethereal user
      pass: "Khang061114", // generated ethereal password
    },
  });
  var item = "";
  //   order.cart.product.map((val) => {
  //     console.log(val);
  //     item += `

  //   <tr>
  //   <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 800; line-height: 24px; padding: 10px;"></td>
  //   <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 800; line-height: 24px; padding: 10px;" class="price"></td>
  //   <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 800; line-height: 24px; padding: 10px;"></td>
  //   <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 800; line-height: 24px; padding: 10px;" class="price"></td>
  //   </tr>

  // `;
  //   });
  let htmlOrder = `<!DOCTYPE html>
  <html>
  
  <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
          body,
          table,
          td,
          a {
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
          }
  
          table,
          td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
          }
  
          img {
              -ms-interpolation-mode: bicubic;
          }
  
          img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
          }
  
          table {
              border-collapse: collapse !important;
          }
  
          body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
          }
  
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
          }
  
          @media screen and (max-width: 480px) {
              .mobile-hide {
                  display: none !important;
              }
  
              .mobile-center {
                  text-align: center !important;
              }
          }
  
          div[style*="margin: 16px 0;"] {
              margin: 0 !important;
          }
      </style>
  
  <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
          For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them.
      </div>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
              <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#F44336">
                              <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                  <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                      <tr>
                                          <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                              <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">Lusion</h1>
                                          </td>
                                      </tr>
                                  </table>
                              </div>
                              <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                                  <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                      <tr>
                                          <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                              <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                  <tr>
                                                      <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                          <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;"><a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Shop &nbsp;</a></p>
                                                      </td>
                                                      <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;"> <a href="#" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://img.icons8.com/color/48/000000/small-business.png" width="27" height="23" style="display: block; border: 0px;" /></a> </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                  <tr>
                                      <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                                          <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"> Thank You For Your Order! </h2>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                          <h2 style="font-size: 19px; font-weight: 600; line-height: 24px; color: #333;"> Xin chào</h2>
                                          <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                          Lusion đã nhận được yêu cầu đặt hàng của bạn và đang xử lý nhé. Bạn sẽ nhận được thông báo tiếp theo khi đơn hàng đã sẵn sàng được giao. Bạn có thể xem hóa đơn của đơn hàng ở trang cá nhân. Cảm ơn!!!</p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="left" style="padding-top: 20px;">
                                          <table cellspacing="0" cellpadding="0" border="0" width="100%" class="table">
                                              <tr>
                                              <td align="left" style="padding-top:20px">
                                              <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                              <tbody>
                                              <tr>
                                                  <td width="75%" align="left" style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:16px;font-weight:800;line-height:24px;padding:10px;border-top:3px solid #eeeeee;border-bottom:3px solid #eeeeee">Kiện Hàng</td>
                                                  <td width="25%" align="left" style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:16px;font-weight:800;line-height:24px;padding:10px;border-top:3px solid #eeeeee;border-bottom:3px solid #eeeeee">#</td>
                                              </tr>
                                              </tbody>
                                              </table>
                                              </td>
                                              </tr>
                                              <tr>
                                                  <td width="25%" align="left" bgcolor="#7fad39" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 800; line-height: 24px; padding: 10px;color:#fff;white-space:nowrap">Sản phẩm </td>
                                                  <td width="25%" align="left" bgcolor="#7fad39" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 800; line-height: 24px; padding: 10px;color:#fff;white-space:nowrap">Đơn giá</td>
                                                  <td width="25%" align="left" bgcolor="#7fad39" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 800; line-height: 24px; padding: 10px;color:#fff;white-space:nowrap">Số lượng</td>
                                                  <td width="25%" align="left" bgcolor="#7fad39" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 800; line-height: 24px; padding: 10px;color:#fff;white-space:nowrap">Tổng tạm</td>
                                              </tr>
                                        
                                            
                                             
                                              <tr>
                                                  <td width="75%" align="right" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Thành tiền </td>
                                                  <td width="25%" align="right" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;" class="price"></td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="left" style="padding-top: 20px;">
                                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                              <tr>
                                                  <td width="75%" align="right" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> Tổng giá trị đơn hàng </td>
                                                  <td width="25%" align="right" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;" class="price"></td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                                  <tr>
                                      <td align="center" valign="top" style="font-size:0;">
                                          <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                              <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                                  <tr>
                                                      <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                          <p style="font-weight: 800;">Địa chỉ giao hàng</p>
                                                          <p></p>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </div>
                                          <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                              <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                                  <tr>
                                                      <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                          <p style="font-weight: 800;">Estimated Delivery Date</p>
                                                          <p>January 1st, 2016</p>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </div>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style=" padding: 35px; background-color: #ff7361;" bgcolor="#1b9ba3">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                  <tr>
                                      <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                          <h2 style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;"> Get 30% off your next order. </h2>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="center" style="padding: 25px 0 15px 0;">
                                          <table border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                  <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7"> <a href="#" target="_blank" style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #F44336; padding: 15px 30px; border: 1px solid #F44336; display: block;">Shop Again</a> </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                  <tr>
                                      <td align="center"> <img src="logo-footer.png" width="37" height="37" style="display: block; border: 0px;" /> </td>
                                  </tr>
                                  <tr>
                                      <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                                          <p style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;"> 675 Parko Avenue<br> LA, CA 02232 </p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                          <p style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;"> If you didn't create an account using this email address, please ignore this email or <a href="#" target="_blank" style="color: #777777;">unsusbscribe</a>. </p>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  <script>
  var formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
            })
          
            jQuery( ".price" ).each(function( index ) {
               
                jQuery(this).text(formatter.format(jQuery(this).text()));
    });
  </script>
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  </html>`;
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Lusion " <foo@example.com>', // sender address
    to: "HoangKhang1999ag@gmail.com", // list of receivers
    subject: "Lusion đã xác nhận đơn hàng của bạn", // Subject line
    text: "Hello world?", // plain text body
    html: htmlOrder, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// conn.connect(function (err) {
//   if (err) throw err.stack;
//   //Bắt đầu transaction
//   db.beginTransaction(function (err) {
//     if (err) throw err;
//     //Thực thi câu lệnh thứ 1
//     db.query(
//       `UPDATE phieudat SET TRANGTHAI='Đã phân công',MANVD='${req.body.idnvd}',MANVGH='${req.body.idnvgh}',MAHD='${idbill}' WHERE MAPD='${req.body.iddonhang}'`,
//       function (err, results) {
//         //nếu có lỗi
//         if (err) {
//           //rollback quá trình
//           return db.rollback(function () {
//             throw err;
//           });
//         }
//         //Thực thi câu lệnh thứ 2
//         db.query(
//           `UPDATE ct_phieudat SET TRANGTHAI='Đã phân công',MANVDH='${req.body.idnvd}',MANVGH='${req.body.idnvgh}' WHERE MAPD='${req.body.iddonhang}'`,
//           function (err) {
//             //Nếu lỗi thì
//             if (err) {
//               //rollback transaction
//               return db.rollback(function () {
//                 throw err;
//               });
//             }
//             //Nếu các câu truy vấn đều thành công thì thực hiện commit
//             db.commit(function (err) {
//               //nếu commit lỗi
//               if (err) {
//                 //rollback transaction
//                 return db.rollback(function () {
//                   throw err;
//                 });
//               }
//               //Nếu thành công thì ...
//               console.log("insert thanh cong");
//             });
//           }
//         );
//       }
//     );
//   });
// });

//nhap hang
router.post("/nhaphang", async function (req, res, next) {
  let arrimport = JSON.parse(req.body.arrImport);
  console.log(arrimport);
  var newdate = req.body.date.split("/").reverse().join("-");
  console.log(newdate);

  let date1 = newdate.charAt(5) + newdate.charAt(6);
  let date2 = newdate.charAt(8) + newdate.charAt(9);
  let date3 =
    newdate.charAt(0) +
    newdate.charAt(1) +
    newdate.charAt(2) +
    newdate.charAt(3);

  if (new Number(date1) > 12) {
    console.log("Đây là tháng");
    newdate = date3 + "-" + date2 + "-" + date1;
  }

  console.log(newdate);

  let sql1 = `SELECT * FROM dondathang WHERE MADDH = '${req.body.idorder}'`;
  db.query(sql1, (err, rows) => {
    if (rows.length <= 0) {
      res.redirect("/quan-tri/import_product");
      console.log("Khong ton tai ma don dat hang!!!");
      return;
    }
    let sql2 = `SELECT * FROM phieunhap WHERE MAPN = '${req.body.idcoupon}'`;
    db.query(sql2, (err, rows) => {
      if (rows.length <= 0) {
        db.query(
          `INSERT INTO phieunhap(MAPN,NGAYLAP,MANV,MADDH)
      VALUES('${req.body.idcoupon}','${newdate}','${req.body.idnv}','${req.body.idorder}')`,
          function (err) {
            if (err) throw err;

            let query = modelAdmin.createcoupondetail(
              arrimport,
              req.body.idcoupon
            );
            let query1 = model_checkout.handleQuantity1(arrimport);
            res.redirect("/quan-tri/import_product");
          }
        );
      } else {
        db.query(
          `DELETE FROM ct_phieunhap WHERE MAPN='${req.body.idcoupon}'`,
          function (err) {
            if (err) throw err;

            let query = modelAdmin.createcoupondetail(
              arrimport,
              req.body.idcoupon
            );
            res.redirect("/quan-tri/import_product");
          }
        );
      }
    });
  });
});

//dat hang cho nha cung cap
router.get("/order_producer/:id", function (req, res, next) {
  var data = db.query(
    `select d.MADONG,d.HINHANH,d.TENDONG,d.GIA,n.TENNCC,n.DIACHI,n.SDT,n.EMAIL,n.MANCC from dongruou as d,nhacungcap as n 
    where n.MANCC = d.MANCC and n.MANCC = '${req.params.id}'`,
    function (err, result) {
      if (err) throw err;
      data = result;
      console.log(data);
      res.render("site/orderProducer.ejs", { data });
    }
  );
});
//
router.get("/export_excel/:id", function (req, res, next) {
  var data = db.query(
    `select n.MANCC,n.TENNCC,n.DIACHI,n.SDT,n.EMAIL from nhacungcap as n
    where n.MANCC = '${req.params.id}'`,
    function (err, result) {
      if (err) throw err;
      data = result;
      console.log(data);
      res.render("site/exportexcelorder.ejs", { data });
    }
  );
});

//insert du lieu vao db dondathang
router.post("/saveOrder", async function (req, res) {
  var maddh = req.body.iddh;
  var manv = req.body.idnv;
  var mancc = req.body.idncc;
  var currentdate = new Date();
  var cartarr1 = req.body.arrCart1;
  var listCart = JSON.parse(cartarr1);

  var datetime =
    currentdate.getFullYear() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getDate();
  data2 = {
    id: maddh,
    listCart: listCart,
  };
  db.query(
    `INSERT INTO dondathang(MADDH,NGAYDAT,MANV,MANCC)
    VALUES('${maddh}','${datetime}','${req.body.idnv}','${req.body.idncc}')`,
    function (err) {
      if (err) throw err;
      let query = modelAdmin.createOrderDetail(data2);

      var data = db.query(
        `select d.MADONG,d.HINHANH,d.TENDONG,d.GIA,n.TENNCC,n.DIACHI,n.SDT,n.EMAIL,n.MANCC from dongruou as d,nhacungcap as n 
        where n.MANCC = d.MANCC and n.MANCC = '${mancc}'`,
        function (err, result) {
          if (err) throw err;
          data = result;
          console.log(data);
          res.render("site/orderProducer.ejs", { data });
        }
      );
    }
  );
});

//API
router.get("/api/all-ddh", async function (req, res) {
  let data = await modelAdmin.all_ddh();
  res.json(data);
});

router.get("/api/all-khachhang", async function (req, res) {
  let data = await modelAdmin.listKH();
  res.json(data);
});
router.get("/api/all-thuonghieu", async function (req, res) {
  let data = await modelAdmin.listTH();
  res.json(data);
});
router.get("/api/all-SP", async function (req, res) {
  let data = await modelAdmin.listSP();
  res.json(data);
});
router.get("/api/all-nhanvien", async function (req, res) {
  let data = await modelAdmin.listNV();
  res.json(data);
});

router.get("/api/all-catalog", async function (req, res) {
  let data = await modelAdmin.liscat();
  res.json(data);
});

router.get("/api/all-khuyenmai", async function (req, res) {
  let data = await modelAdmin.listctkhuyenmai();
  res.json(data);
});

router.get("/api/all-khuyenmai1", async function (req, res) {
  let data = await modelAdmin.listkhuyenmai();
  res.json(data);
});

router.get("/api/all-cat", async function (req, res) {
  let data = await modelAdmin.liscat();
  res.json(data);
});

router.get("/api/all-brand", async function (req, res) {
  let data = await modelAdmin.listbrand();
  res.json(data);
});

router.get("/api/all-orders", async function (req, res) {
  let data = await modelAdmin.listOrders();
  res.json(data);
});

router.get("/api/all-nvgh", async function (req, res) {
  let data = await modelAdmin.listnvgh();
  res.json(data);
});

router.get("/api/all-order-not", async function (req, res) {
  let data = await modelAdmin.listOrdersnot();
  res.json(data);
});

router.get("/api/all-order-ok", async function (req, res) {
  let data = await modelAdmin.listOrdersok();
  res.json(data);
});

router.get("/api/all-order-complete", async function (req, res) {
  let data = await modelAdmin.listOrderscomplete();
  res.json(data);
});

router.get("/api/all-order-cancle", async function (req, res) {
  let data = await modelAdmin.listOrderscancle();
  res.json(data);
});

router.get("/api/revenu30days", async function (req, res) {
  let data = await modelAdmin.sum_revenu30days();
  res.json(data);
});

router.get("/api/revenu7days", async function (req, res) {
  let data = await modelAdmin.sum_revenu7days();
  res.json(data);
});

router.get("/api/revenuyear", async function (req, res) {
  let data = await modelAdmin.sum_revenu_year();
  res.json(data);
});

router.get("/api/revenutoday", async function (req, res) {
  let data = await modelAdmin.sum_revenu_today();
  res.json(data);
});

router.get("/api/product_sold", async function (req, res) {
  let data = await modelAdmin.product_sold();
  res.json(data);
});

router.get("/api/product_sold_today", async function (req, res) {
  let data = await modelAdmin.product_sold_today();
  res.json(data);
});

router.get("/api/product_sold_7days", async function (req, res) {
  let data = await modelAdmin.product_sold_7days();
  res.json(data);
});

router.get("/api/product_sold_30days", async function (req, res) {
  let data = await modelAdmin.product_sold_30days();
  res.json(data);
});

router.get("/api/product_sold_year", async function (req, res) {
  let data = await modelAdmin.product_sold_year();
  res.json(data);
});

router.get("/api/count_order", async function (req, res) {
  let data = await modelAdmin.count_order();
  res.json(data);
});

router.get("/api/count_order_not", async function (req, res) {
  let data = await modelAdmin.count_order_not();
  res.json(data);
});

router.get("/api/count_order_ok", async function (req, res) {
  let data = await modelAdmin.count_order_ok();
  res.json(data);
});

router.get("/api/count_order_cancle", async function (req, res) {
  let data = await modelAdmin.count_order_cancle();
  res.json(data);
});

router.get("/api/count_order_complete", async function (req, res) {
  let data = await modelAdmin.count_order_complete();
  res.json(data);
});

router.get("/api/district", async function (req, res) {
  let data = await modelAdmin.list_district();
  res.json(data);
});

router.get("/api/listDeliById/:id", async function (req, res) {
  let id = req.params.id;
  let data = await modelAdmin.list_delivery(id);
  console.log(data);
  res.json(data);
});

router.get("/api/ReportRevenue/:year", async function (req, res) {
  let year = req.params.year;
  let data = await modelAdmin.ReportRevenupdf(year);
  res.json(data);
});

router.get("/api/ReportQuantityInStock", async function (req, res) {
  let data = await modelAdmin.ReportQuantityInStock();
  res.json(data);
});

router.get("/api/AllCostProduct", async function (req, res) {
  let data = await modelAdmin.AllCostProduct();
  res.json(data);
});
router.get("/api/product_sold_pdf/:from/:to/:lm", async function (req, res) {
  let from = req.params.from;
  let to = req.params.to;
  let lm = req.params.lm;
  let data = await modelAdmin.product_sold_custom_pdf(from, to, lm);
  res.json(data);
});

router.get("/api/GetyearRevenue", async function (req, res) {
  let data = await modelAdmin.GetYearRevenue();
  res.json(data);
});

router.get("/api/IDDONDATHANG", async function (req, res) {
  let data = await modelAdmin.IDDONDATHANG();
  res.json(data);
});

module.exports = router;
