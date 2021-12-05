var db = require("./database"); //nhúng model database vào đế kết nối db
var dataList = []; // biến để chứa dữ liệu đổ về cho controller
var dataName = [];

// định nghĩa các hàm để tương tác vào mysql
exports.list = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql =
      "SELECT d.MADONG,d.TENDONG,d.GIA,d.TRANGTHAI,d.HINHANH,d.MOTA,d.CHITIET,d.SOLUONGTON,d.MALOAI,d.MATH,d.MANCC,ct.PHANTRAMGIAM FROM dongruou as d left join (SELECT ct.MADONG,km.NGAYBATDAU,km.NGAYKETTHUC,ct.PHANTRAMGIAM FROM ct_khuyenmai as ct,khuyenmai as km WHERE ct.MAKM = km.MAKM and CURDATE() > km.NGAYBATDAU and CURDATE() < km.NGAYKETTHUC) as ct on d.MADONG = ct.MADONG";
    db.query(sql, (err, d) => {
      console.log("List success!!!");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.listkm = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql =
      "SELECT km.TENKM,km.NGAYBATDAU,km.NGAYKETTHUC,ctkm.PHANTRAMGIAM,ctkm.MADONG,r.TENDONG,r.HINHANH,r.GIA,r.MOTA FROM khuyenmai as km,ct_khuyenmai as ctkm,dongruou as r WHERE km.MAKM = ctkm.MAKM and km.NGAYBATDAU <= CURDATE() and km.NGAYKETTHUC > CURDATE()  and r.MADONG = ctkm.MADONG and ctkm.PHANTRAMGIAM >= 50 and r.SOLUONGTON > 0";
    db.query(sql, (err, d) => {
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.detail = (idProduct) => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM dongruou WHERE MADONG=${idProduct}`;
    db.query(sql, (err, d) => {
      console.log("List success");
      data = d[0];
      hamOK(data);
    });
  });
};

exports.detailByName = (name) => {
  return new Promise((hamOK, hamLoi) => {
    let filterProduct;
    let sql = `SELECT * FROM (SELECT d.MADONG as MA,d.TENDONG,d.GIA,d.TRANGTHAI,d.HINHANH,d.MOTA,d.CHITIET,d.SOLUONGTON,d.MALOAI,d.MATH,d.MANCC,ct.PHANTRAMGIAM FROM dongruou as d left join (SELECT ct.MADONG,km.NGAYBATDAU,km.NGAYKETTHUC,ct.PHANTRAMGIAM FROM ct_khuyenmai as ct,khuyenmai as km WHERE ct.MAKM = km.MAKM and CURDATE() > km.NGAYBATDAU and CURDATE() < km.NGAYKETTHUC) as ct on d.MADONG = ct.MADONG) as R left join thaydoigia as T on R.MA= T.MADONG`;
    let query = db.query(sql, (err, d) => {
      console.log("Detail success");
      dataName = d;
      for (i in dataName) {
        let product = dataName[i];
        let newName = replaceNameProduct(product.TENDONG.toLowerCase());
        let newPrice = product.NGAYTHAYDOI;
        console.log(newPrice);
        if (newName === name) {
          filterProduct = product;
        }
      }
      hamOK(filterProduct);
    });
  });
};

exports.delete = (idProduct) => {
  let sql = `DELETE FROM dongruou WHERE MADONG=${idProduct}`;
  let query = db.query(sql, (err, result) => {
    console.log("Delete success");
  });
};

exports.hotProduct = () => {
  return new Promise((hamOK, hamLoi) => {
    let sql = `SELECT * FROM ((SELECT * FROM (Select ct.MADONG as MD, sum(ct.SOLUONG) as so_luong_ban,ct.TRANGTHAI as TTSP 
    FROM ct_phieudat as ct,phieudat as pd WHERE ct.TRANGTHAI = 'Đã giao' and pd.MAPD = ct.MAPD and pd.NGAYDAT >= (curdate() - INTERVAL 30 DAY)
        group by MADONG ) as ct,dongruou as d 
        WHERE ct.MD = d.MADONG and d.SOLUONGTON > 0
        order by so_luong_ban DESC LIMIT 10)) as d
        left join 
    (SELECT ct.MADONG as SPKM,km.NGAYBATDAU,km.NGAYKETTHUC,ct.PHANTRAMGIAM 
    FROM ct_khuyenmai as ct,khuyenmai as km 
    WHERE ct.MAKM = km.MAKM and CURDATE() >= km.NGAYBATDAU and CURDATE() <= km.NGAYKETTHUC) as ct on d.MADONG = ct.SPKM`;
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

exports.newProduct = () => {
  // let sql = "SELECT * FROM product ORDER BY dateUpdate DESC LIMIT 5";
  // let query = db.query(sql, (err, result) => {
  //     console.log('List success');
  //     dataList = result;
  // })
  // return dataList;

  return new Promise((hamOK, hamLoi) => {
    let sql =
      "SELECT d.MADONG,d.TENDONG,d.GIA,d.TRANGTHAI,d.HINHANH,d.MOTA,d.CHITIET,d.SOLUONGTON,d.MALOAI,d.MATH,d.MANCC,ct.PHANTRAMGIAM FROM dongruou as d left join (SELECT ct.MADONG,km.NGAYBATDAU,km.NGAYKETTHUC,ct.PHANTRAMGIAM FROM ct_khuyenmai as ct,khuyenmai as km WHERE ct.MAKM = km.MAKM and CURDATE() > km.NGAYBATDAU and CURDATE() < km.NGAYKETTHUC) as ct on d.MADONG = ct.MADONG WHERE d.MADONG > 18 and SOLUONGTON > 0";
    db.query(sql, (err, d) => {
      console.log("List success");
      dataList = d;
      hamOK(dataList);
    });
  });
};

function xoa_dau(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "i");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
  str = str.replace(/Đ/g, "d");
  str = str.split(" ").join("-");
  return str;
}

function replaceNameProduct(nameProduct) {
  var newNameProduct = xoa_dau(nameProduct);
  return newNameProduct;
}

exports.createComment = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO COMMENT SET ?";
    db.query(sql, data, (err, d) => {
      console.log("Insert successfully");
      resolve(d);
    });
  });
};

exports.getComment = (idProduct) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT content,rating,madong,cm.makh,ngay,kh.HO,kh.TEN FROM comment as cm,khachhang as kh WHERE kh.makh = cm.makh and madong ='${idProduct}'`;
    db.query(sql, (err, d) => {
      resolve(d);
    });
  });
};

exports.listProductofUser = (idUser) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT ct.MADONG FROM ct_phieudat as ct,phieudat as pd WHERE pd.MAKH = '${idUser}'and pd.MAPD = ct.MAPD group by ct.MADONG`;
    db.query(sql, (err, d) => {
      resolve(d);
    });
  });
};
