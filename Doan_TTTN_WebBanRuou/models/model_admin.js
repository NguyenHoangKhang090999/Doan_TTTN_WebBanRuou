var db = require("./database"); //nhúng model database vào đế kết nối db
var dataList = [];
var dataname = [];

exports.createcoupondetail = (data, id) => {
  console.log(data);
  console.log(id);
  for (i = 0; i < data.length; i++) {
    db.query(
      `INSERT INTO ct_phieunhap(MAPN,MADONG,SOLUONG,GIA)
      VALUES('${id}','${data[i].Madong}','${data[i].Soluong}','${data[i].Dongia}')`,
      function (err) {
        if (err) throw err;
        console.log("THÀNH CÔNG!!!");
      }
    );
  }
};

exports.listSP = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql =
      "SELECT  dongruou.MADONG,dongruou.TENDONG,dongruou.GIA,dongruou.HINHANH,COALESCE(dongruou.SOLUONGTON, 0 ) as SOLUONGTON,dongruou.TRANGTHAI,dongruou.MOTA,loairuou.TENLOAI,thuonghieu.TENTH FROM doantttn1.dongruou,loairuou,thuonghieu  where dongruou.MALOAI = loairuou.MALOAI and dongruou.MATH = thuonghieu.MATH order by MADONG";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listSPADDKM = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT  dongruou.MADONG,dongruou.TENDONG,dongruou.GIA,dongruou.HINHANH,COALESCE(dongruou.SOLUONGTON, 0 ) as SOLUONGTON,
      dongruou.TRANGTHAI,dongruou.MOTA,loairuou.TENLOAI,thuonghieu.TENTH 
      FROM doantttn1.dongruou,loairuou,thuonghieu  
      where dongruou.MALOAI = loairuou.MALOAI 
      and dongruou.MATH = thuonghieu.MATH and dongruou.MADONG NOT IN (SELECT ct.MADONG FROM ct_khuyenmai as ct) order by MADONG`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listspaddkm = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql =
      "SELECT  dongruou.MADONG,dongruou.TENDONG,dongruou.GIA,dongruou.HINHANH,COALESCE(dongruou.SOLUONGTON, 0 ) as SOLUONGTON,dongruou.TRANGTHAI,dongruou.MOTA,loairuou.TENLOAI,thuonghieu.TENTH FROM doantttn1.dongruou,loairuou,thuonghieu  where dongruou.MALOAI = loairuou.MALOAI and dongruou.MATH = thuonghieu.MATH order by MADONG EX";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listKH = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = "SELECT * FROM khachhang";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listTH = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = "SELECT * FROM thuonghieu";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listNV = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = "SELECT * FROM nhanvien";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.liscat = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = "SELECT * FROM loairuou";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listctkhuyenmai = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql =
      "SELECT khuyenmai.MAKM,TENKM,NGAYBATDAU,NGAYKETTHUC,LIDO,ct_khuyenmai.MADONG,dongruou.TENDONG,dongruou.HINHANH,ct_khuyenmai.PHANTRAMGIAM FROM khuyenmai,ct_khuyenmai,dongruou where ct_khuyenmai.MAKM = khuyenmai.MAKM and dongruou.MADONG = ct_khuyenmai.MADONG";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listkhuyenmai = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = "SELECT * FROM khuyenmai";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listcat = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = "SELECT * FROM loairuou";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listbrand = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = "SELECT * FROM thuonghieu";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listnvgh = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = "SELECT * FROM nhanvien WHERE MANQ = 3";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listOrders = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM(SELECT pd.NGAYDAT,pd.HONN,pd.TENNN,pd.SDTNN,pd.DIACHINN,pd.MAPD,pd.TRANGTHAI,pd.MAQUAN,kh.HO,kh.TEN,kh.DIACHI,kh.SDT,kh.EMAIL 
        FROM phieudat as pd left join khachhang as kh on kh.MAKH = pd.MAKH) as ct,hoadon as h,quan as q
        WHERE ct.MAPD = h.MAPD and ct.MAQUAN = q.MAQUAN order by pd.NGAYDAT DESC`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listOrdersnot = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql =
      "SELECT * FROM(SELECT pd.NGAYDAT,pd.HONN,pd.TENNN,pd.SDTNN,pd.DIACHINN,pd.MAPD,pd.TRANGTHAI,pd.MAQUAN,kh.HO,kh.TEN,kh.DIACHI,kh.SDT,kh.EMAIL FROM phieudat as pd left join khachhang as kh on kh.MAKH = pd.MAKH WHERE pd.TRANGTHAI='Chưa duyệt') as ct,hoadon as h,quan as q WHERE ct.MAPD = h.MAPD and ct.MAQUAN = q.MAQUAN order by pd.NGAYDAT DESC";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listOrdersok = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM(SELECT pd.NGAYDAT,pd.HONN,pd.TENNN,pd.SDTNN,pd.DIACHINN,pd.MAPD,pd.TRANGTHAI,pd.MAQUAN,kh.HO,kh.TEN,kh.DIACHI,kh.SDT,kh.EMAIL 
        FROM phieudat as pd left join khachhang as kh on kh.MAKH = pd.MAKH WHERE pd.TRANGTHAI='Đã phân công') as ct,hoadon as h,quan as q 
        WHERE ct.MAPD = h.MAPD and ct.MAQUAN = q.MAQUAN order by pd.NGAYDAT DESC`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listOrderscomplete = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM(SELECT pd.NGAYDAT,pd.HONN,pd.TENNN,pd.SDTNN,pd.DIACHINN,pd.MAPD,pd.TRANGTHAI,pd.MAQUAN,kh.HO,kh.TEN,kh.DIACHI,kh.SDT,kh.EMAIL 
        FROM phieudat as pd left join khachhang as kh on kh.MAKH = pd.MAKH WHERE pd.TRANGTHAI='Đã giao') as ct,hoadon as h,quan as q 
        WHERE ct.MAPD = h.MAPD and ct.MAQUAN = q.MAQUAN order by pd.NGAYDAT DESC`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listOrderscancle = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql =
      "SELECT * FROM(SELECT pd.NGAYDAT,pd.HONN,pd.TENNN,pd.SDTNN,pd.DIACHINN,pd.MAPD,pd.TRANGTHAI,kh.HO,kh.TEN,kh.DIACHI,kh.SDT,kh.EMAIL FROM phieudat as pd left join khachhang as kh on kh.MAKH = pd.MAKH WHERE pd.TRANGTHAI='Đã hủy') as ct,hoadon as h WHERE ct.MAPD = h.MAPD order by pd.NGAYDAT DESC";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listOrderDetailById = (data) => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM ct_phieudat as ct,phieudat as pd WHERE ct.MAPD='${data}' and ct.MAPD = pd.MAPD`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listOrderofUser = (data) => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM(SELECT DIACHINN,HONN,TENNN,SDTNN,NGAYDAT,MAPD,TRANGTHAI FROM phieudat WHERE MAKH = '${data}') as pd left join hoadon as hd on hd.MAPD = pd.MAPD order by pd.NGAYDAT DESC`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.createBill = (data, idnv, idpd) => {
  let date = data[0].NGAYDAT;
  let datetime =
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  console.log(data);
  const idtax = Math.floor(Math.random() * 10000000000);
  db.query(
    `UPDATE hoadon SET NGAY = '${datetime}',MASOTHUE='${idtax}',MANV='${idnv}' WHERE MAPD ='${idpd}'`,
    function (err) {
      if (err) throw err;
    }
  );
};

exports.create_Bill = (data, idhd, idpd) => {
  console.log(data);
  var sum = 0;
  for (i = 0; i < data.length; i++) {
    if (data[i].PHANTRAMGIAM != null) {
      sum +=
        (data[i].GIA * (100 - data[i].PHANTRAMGIAM) * data[i].quantity) / 100;
    } else {
      sum += data[i].GIA * data[i].quantity;
    }
  }

  if (sum < 200) {
    var ship = data.length * 2;
  } else {
    var ship = 0;
  }
  sum += ship;
  sum = sum.toFixed(2);
  db.query(
    `INSERT INTO hoadon(MAHD,THANHTIEN,MAPD)
      VALUES('${idhd}','${sum}','${idpd}')`,
    function (err) {
      if (err) throw err;
    }
  );
};

exports.sum_revenu30days = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT pd.MAPD,hd.THANHTIEN,ROUND(sum(hd.THANHTIEN),2) as TONG FROM phieudat as pd,hoadon as hd WHERE hd.MAPD = pd.MAPD and pd.TRANGTHAI = 'Đã giao' and hd.NGAY >= (curdate() - INTERVAL 30 DAY)`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.sum_revenu7days = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT pd.MAPD,hd.THANHTIEN,ROUND(sum(hd.THANHTIEN),2) as TONG FROM phieudat as pd,hoadon as hd WHERE hd.MAPD = pd.MAPD and pd.TRANGTHAI = 'Đã giao' and hd.NGAY >= (curdate() - INTERVAL 7 DAY)`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.sum_revenu_year = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT pd.MAPD,hd.THANHTIEN,ROUND(sum(hd.THANHTIEN),2) as TONG FROM phieudat as pd,hoadon as hd WHERE hd.MAPD = pd.MAPD and pd.TRANGTHAI = 'Đã giao' and  DATE_FORMAT(NOW(),'01/01/%Y')<= hd.NGAY <= DATE_FORMAT(NOW(),'31/12/%Y')`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.sum_revenu_today = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT pd.MAPD,hd.THANHTIEN,ROUND(sum(hd.THANHTIEN),2) as TONG FROM phieudat as pd,hoadon as hd WHERE hd.MAPD = pd.MAPD and pd.TRANGTHAI = 'Đã giao' and  hd.NGAY = curdate()`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.product_sold = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT d.TENDONG,d.HINHANH,sum(ct.SOLUONG) as sl 
    FROM ct_phieudat as  ct,dongruou as d,phieudat as pd
    WHERE ct.TRANGTHAI = 'Đã giao' and d.MADONG=ct.MADONG and ct.MAPD = pd.MAPD group by ct.MADONG order by sl DESC`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.product_sold_custom_pdf = (from, to, lm) => {
  let limit = lm;
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT d.MADONG,d.TENDONG,d.HINHANH,sum(ct.SOLUONG) as sl 
    FROM ct_phieudat as  ct,dongruou as d,phieudat as pd
    WHERE pd.TRANGTHAI = 'Đã giao' and d.MADONG=ct.MADONG and ct.MAPD = pd.MAPD and pd.NGAYDAT between '${from}' and '${to}'
    group by ct.MADONG order by sl DESC limit ${limit}`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.product_sold_today = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT d.TENDONG,d.HINHANH,sum(ct.SOLUONG) as sl 
    FROM ct_phieudat as  ct,dongruou as d,phieudat as pd 
    WHERE ct.TRANGTHAI = 'Đã giao'  and d.MADONG=ct.MADONG and ct.MAPD = pd.MAPD and pd.NGAYDAT = curdate()
    group by ct.MADONG order by sl DESC`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.product_sold_30days = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT d.TENDONG,d.HINHANH,sum(ct.SOLUONG) as sl 
    FROM ct_phieudat as  ct,dongruou as d,phieudat as pd 
    WHERE ct.TRANGTHAI = 'Đã giao'  and d.MADONG=ct.MADONG and ct.MAPD = pd.MAPD and pd.NGAYDAT >= (curdate() - INTERVAL 30 DAY) 
    group by ct.MADONG order by sl DESC`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.product_sold_7days = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT d.TENDONG,d.HINHANH,sum(ct.SOLUONG) as sl 
    FROM ct_phieudat as  ct,dongruou as d,phieudat as pd 
    WHERE ct.TRANGTHAI = 'Đã giao'  and d.MADONG=ct.MADONG and ct.MAPD = pd.MAPD and pd.NGAYDAT >= (curdate() - INTERVAL 7 DAY) 
    group by ct.MADONG order by sl DESC`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.product_sold_year = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT d.TENDONG,d.HINHANH,sum(ct.SOLUONG) as sl 
    FROM ct_phieudat as  ct,dongruou as d,phieudat as pd 
    WHERE ct.TRANGTHAI = 'Đã giao'  and d.MADONG=ct.MADONG and ct.MAPD = pd.MAPD and DATE_FORMAT(NOW(),'01/01/%Y')<= pd.NGAYDAT <= DATE_FORMAT(NOW(),'31/12/%Y')
    group by ct.MADONG order by sl DESC`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.count_order = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT COUNT(pd.MAPD) as sl FROM phieudat as pd`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.count_order_not = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT COUNT(pd.MAPD) as sl FROM phieudat as pd WHERE pd.TRANGTHAI = "Chưa duyệt"`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};
exports.count_order_complete = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT COUNT(pd.MAPD) as sl FROM phieudat as pd WHERE pd.TRANGTHAI = "Đã giao"`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};
exports.count_order_cancle = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT COUNT(pd.MAPD) as sl FROM phieudat as pd WHERE pd.TRANGTHAI = "Đã hủy"`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.count_order_ok = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT COUNT(pd.MAPD) as sl FROM phieudat as pd WHERE pd.TRANGTHAI = "Đã phân công"`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.all_ddh = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM dondathang`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.createOrderDetail = (data) => {
  console.log(data);
  let cart = data.listCart;
  for (i = 0; i < cart.length; i++) {
    db.query(
      `INSERT INTO ct_dondathang(MADONG,MADDH,SOLUONG,GIA)
      VALUES('${cart[i].MADONG}','${data.id}','${cart[i].quantity}','${cart[i].GIA}')`,
      function (err) {
        if (err) throw err;
        console.log("THÀNH CÔNG!!!");
      }
    );
  }
};

exports.list_district = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM QUAN`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.list_delivery = (iddistrict) => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT nv.MANV,nv.HO,nv.TEN,count(pd.MANVGH) as sd FROM(SELECT nv.HO,nv.TEN,nv.MANV 
      FROM nhanvien as nv,phancong as pc 
      WHERE pc.MANVGH = nv.MANV and pc.MAQUAN = '${iddistrict}') as nv
      left join phieudat as pd on pd.MANVGH = nv.MANV and MONTH(pd.NGAYDAT) = month(curdate()) group by nv.MANV order by sd ASC`;
    db.query(sql, (err, d) => {
      console.log("List success");
      data = d;
      hamOK(data);
    });
  });
};

//danh sach don hang duoc phan cong cua nhan vien
exports.listDeliveryStaff = (data) => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT pd.MAPD,pd.NGAYDAT,pd.HONN,pd.TENNN,pd.DIACHINN,pd.SDTNN,hd.THANHTIEN 
    FROM phieudat as pd,hoadon as hd 
    WHERE hd.MAPD = pd.MAPD and MANVGH = '${data}' and pd.TRANGTHAI = 'Đã phân công' order by pd.NGAYDAT DESC`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listDeliveryStaffFinish = (data) => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT pd.MAPD,pd.NGAYDAT,pd.HONN,pd.TENNN,pd.DIACHINN,pd.SDTNN,hd.THANHTIEN 
    FROM phieudat as pd,hoadon as hd 
    WHERE hd.MAPD = pd.MAPD and MANVGH = '${data}' and pd.TRANGTHAI = 'Đã giao' order by pd.NGAYDAT DESC`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.ReportRevenupdf = (year) => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT tmp.id,tmp.THANG, IFNULL(p.TONGTIEN,0) as DOANHTHU,p.USD FROM TEMP_MONTH as tmp left join (
      SELECT ROUND(SUM(hd.THANHTIEN),0) *ROUND((SELECT vn.PRICE FROM vnd_unit as vn order by vn.DATE_CHANGE DESC limit 1),-3) as TONGTIEN,ROUND(SUM(hd.THANHTIEN),2) as USD, MONTH(hd.NGAY) as THANG
      FROM hoadon as hd
      WHERE YEAR(hd.NGAY) = '${year}' 
      GROUP BY MONTH(hd.NGAY))as p on tmp.THANG = p.THANG`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.ReportQuantityInStock = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT d.MADONG,l.TENLOAI,d.TENDONG,d.MOTA,'Chai' as DVT,d.SOLUONGTON,ROUND((d.GIA*(SELECT vn.PRICE FROM vnd_unit as vn order by vn.DATE_CHANGE DESC limit 1)),-3) as GIA,d.SOLUONGTON*ROUND((d.GIA*(SELECT vn.PRICE FROM vnd_unit as vn order by vn.DATE_CHANGE DESC limit 1)),-3) as TRIGIA
    FROM dongruou as d,loairuou as l
    WHERE d.MALOAI = l.MALOAI `;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.AllCostProduct = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `
    SELECT ct.MAPN,SUM(ROUND((ct.SOLUONG*ct.GIA*vn.PRICE)/12)) as TONG 
    FROM ct_phieunhap as ct,vnd_unit as vn,phieunhap as pn 
    WHERE YEAR(pn.NGAYLAP) = '2021'`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.GetYearRevenue = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `
    SELECT year(NGAYDAT) as YEAR FROM phieudat group by year(NGAYDAT)`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.IDDONDATHANG = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `
    SELECT MADDH FROM dondathang`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};
