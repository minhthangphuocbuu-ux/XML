//B1
const thuyen = new XMLHttpRequest();

thuyen.open(
    "GET",
    "https://provinces.open-api.vn/api/v1/"
);

thuyen.onreadystatechange = function () {
    if (thuyen.readyState === 4) {
        if (thuyen.status === 200) {

            const ruong = JSON.parse(thuyen.responseText);

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

thuyen.send();

