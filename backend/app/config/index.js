const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    // THÔNG TIN KẾT NỐI MONGODB
    db: {
        // Đảm bảo tên database (auth_db) ở cuối
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/user_auth_db", 
    },
    // THÔNG TIN JWT
    jwt: {
        secret: process.env.JWT_SECRET || "Chuoi-Bi-Mat-Rat-Quan-Trong-Dung-De-Tao-JWT" 
    }
};

module.exports = config;