require("dotenv").config({});
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

require("./config/database");

// routes import
const authRoutes = require("./routes/authentication");
const dashboardRoutes = require("./routes/dashboard");
// routes import

const {isAuthenticated, isSignedIn} = require("./middlewares/authMiddleware");

const PORT = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(cookieParser());
// middlewares


// routes
app.use("/auth", authRoutes);
app.use("/", isSignedIn, isAuthenticated, dashboardRoutes);
// routes


// start the server 
app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`);
})