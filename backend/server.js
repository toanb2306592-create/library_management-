const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util"); // Class MongoDB

async function startServer() {
    try {
        // 1. KẾT NỐI DATABASE: Gọi hàm connect static
        // Hàm connect đã lưu trữ client trong MongoDB.client
        await MongoDB.connect(config.db.uri); 

        // 2. CHẠY SERVER
        app.listen(config.app.port, () => {
            console.log(`Server đang chạy trên cổng ${config.app.port}`);
        });

    } catch (error) {
        console.error("Không thể khởi động server:", error);
        process.exit(1);
    }
}

startServer();