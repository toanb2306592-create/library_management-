require('dotenv').config();

const express = require("express"); 
const cors = require("cors"); 
const ApiError = require("./app/api-error");
const employeeRoutes = require("./app/routes/employee.route");
const bookRoutes = require("./app/routes/book.routes");
const publisherRoutes = require("./app/routes/publisher.routes");
const readerRoutes = require("./app/routes/reader.routes");
const borrowRoutes = require("./app/routes/borrow.routes");


const PORT = process.env.PORT || 3000;

const app = express(); 

app.use(cors()); 
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.use("/api/employees", employeeRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/publishers", publisherRoutes);
app.use('/uploads', express.static('uploads'));
app.use("/api/readers", readerRoutes);
app.use("/api/borrows", borrowRoutes);

app.get("/", (req, res) => { 
    res.json({ message: "Welcome to the library management application." }); 
}); 

// Xử lý lỗi 404 (Resource not found)
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// Xử lý lỗi tập trung (Error handling middleware)
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});


module.exports = app;