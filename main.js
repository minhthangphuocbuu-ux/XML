//B1
const thuyen_1 = new XMLHttpRequest();

thuyen_1.open(
    "GET",
    "https://provinces.open-api.vn/api/v1/"
);

thuyen_1.onreadystatechange = function () {
    if (thuyen_1.readyState === 4) {
        if (thuyen_1.status === 200) {

            const ruong = JSON.parse(thuyen_1.responseText);

            console.log("Quê mình có", ruong.length, "xứ");
            const haiMuoiXuDau = ruong.slice(0, 20);
            
            const bang = haiMuoiXuDau.map(function (x) {
                return {
                    name: x.name,
                    code: x.code
                };
            });
            console.table(bang);
            
            const thanhPhoTrungUong = ruong.filter(function (x) {
                return x.division_type === "thành phố trung ương";
            });
            thanhPhoTrungUong.forEach(function (x) {
                console.log(x.name);
            });
        } else {
            console.log("Chuyến hỏng, con dấu:", thuyen.status);
        }
    }
};

thuyen_1.send();

//B2
 const thuyen_2 = new XMLHttpRequest();

thuyen_2.open(
    "GET",
    "https://api.vietqr.io/v2/banks"
);

thuyen_2.onreadystatechange = function () {
    if (thuyen_2.readyState === 4) {
        if (thuyen_2.status === 200) {

            const ruong = JSON.parse(thuyen_2.responseText);

            const nganHang = ruong.data;

            console.log(
                "Tổng số ngân hàng:",
                nganHang.length
            );

            const bangNganHang = nganHang.map(function (x) {
                return {
                    shortName: x.shortName,
                    bin: x.bin
                };
            });

            console.table(bangNganHang);

            const nganHangCuaToi = nganHang.find(function (x) {
                return x.shortName === "BIDV";
            });

            console.log(nganHangCuaToi.name);

        } else {
            console.log("Chuyến hỏng, con dấu:", thuyen_2.status);
        }
    }
};

thuyen_2.send();