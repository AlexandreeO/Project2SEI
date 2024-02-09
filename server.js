const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("./config/passport");
require("dotenv").config(); // For loading environment variables
const methodOverride = require('method-override');

// models
require("./models/Trip");
const Trip = require("./models/Trip");
// database
const db = require("./config/database");

//Routes variables
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const myTripsRouter = require("./routes/mytrips");
const surfspotsRouter = require("./routes/surfspots");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    })
    );
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(function (req, res, next) {
        res.locals.user = req.user;
        next();
    });
    
    // using routers so server can process routes/pages
    app.use("/", indexRouter);
    app.use("/users", usersRouter);
    app.use("/mytrips", myTripsRouter);
    app.use("/surfspots", surfspotsRouter);
    
    // Google OAuth callback route
app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        // Successful authentication, redirect to the home page or dashboard
        res.redirect("/");
    }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
