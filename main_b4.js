function goiAPI(duongDan, khiXong, khiLoi) {
    const thuyen = new XMLHttpRequest();
    thuyen.open("GET", duongDan);
    thuyen.onreadystatechange = function () {
        if (thuyen.readyState === 4) {
            if (thuyen.status === 200) {
                khiXong(
                    JSON.parse(thuyen.responseText)
                );
            } else {
                khiLoi(thuyen.status);
            }
        }
    };
    thuyen.send();
}

// B1
goiAPI(
    "https://provinces.open-api.vn/api/v1/",
    function (haiDo) {
        console.log("Quê mình có", haiDo.length, "xứ");
        const bang = haiDo.slice(0, 20)
            .map(function (x) {
                return {
                    name: x.name,
                    code: x.code
                };
            });
        console.table(bang);
        const thanhPhoTrungUong =
            haiDo.filter(function (x) {
                return x.division_type ===
                    "thành phố trung ương";
            });
        thanhPhoTrungUong.forEach(function (x) {
            console.log(x.name);
        });
    },

    function (ma) {
        console.log("Chuyến hỏng, con dấu:", ma);
    }
);



// B2
goiAPI(
    "https://api.vietqr.io/v2/banks",

    function (ruong) {
        const nganHang = ruong.data;
        console.log("Tổng số ngân hàng:", nganHang.length);
        console.table(
            nganHang.map(function (x) {
                return {
                    shortName: x.shortName,
                    bin: x.bin
                };
            })
        );

        const nganHangCuaToi = nganHang.find(function (x) {
                return x.shortName === "BIDV";
            });
        console.log(nganHangCuaToi.name);
    },

    function (ma) {
        console.log("Chuyến hỏng, con dấu:", ma);
    }
);



// B3
goiAPI(
    "https://provinces.open-api.vn/api/v1/",
    function (haiDo) {
        const xu = haiDo.find(function (x) {
            return x.name.includes("Hồ Chí Minh");
        });
        console.log("Tìm thấy:", xu);
        const code = xu.code;
        console.log("Code:", code);

        goiAPI(
            "https://provinces.open-api.vn/api/v1/p/" + code + "?depth=2",
            function (xuChiTiet) {
                const districts = xuChiTiet.districts;
                console.table(
                    districts.map(function (x) {
                        return {
                            name: x.name,
                            code: x.code
                        };
                    })
                );
            },

            function (ma) {
                console.log("Thuyền 2 hỏng:", ma);
            }
        );
    },

    function (ma) {
        console.log("Thuyền 1 hỏng:", ma);
    }
);