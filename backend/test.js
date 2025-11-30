const axios = require("axios");

async function testEmployees() {
  try {
    const res = await axios.get("http://localhost:3000/api/employees");
    console.log("Dữ liệu nhân viên:", res.data);
  } catch (err) {
    console.error("Lỗi khi gọi API:", err.message);
    if (err.response) console.error(err.response.data);
  }
}

testEmployees();
