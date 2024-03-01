var express = require("express");
var router = express.Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const User = require("../models/user");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");
/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failed",
    successRedirect: "/login-sucess",
  })
);

router.get("/sign-up", (req, res, next) => {
  res.render("register");
});

router.post("/sign-up", async (req, res, next) => {
  try {
    const saltHash = genPassword(req.body.password);

    const hash = saltHash.genHash;
    const salt = saltHash.salt;

    const user = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
      admin: true,
    });

    await user.save();
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

router.get("/login-sucess", (req, res, next) => {
  res.render("login-sucess");
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // Redirect or respond as needed after logout
    res.redirect("/"); // Example: Redirect to the home page
  });
});

router.get("/protected-route", isAuth, (req, res, next) => {
  res.send("You are authenticated");
});

router.get("/admin-route", isAdmin, (req, res, next) => {
  res.send("You are an admin");
});

module.exports = router;
