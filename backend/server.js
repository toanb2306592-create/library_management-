const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
    try {
        await MongoDB.connect(config.db.uri); 
        app.listen(config.app.port, () => {
            console.log(`Server đang chạy trên cổng ${config.app.port}`);
        });

    } catch (error) {
        console.error("Không thể khởi động server:", error);
        process.exit(1);
    }
}

startServer();