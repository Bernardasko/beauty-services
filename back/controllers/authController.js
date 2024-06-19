const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const sendCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);
};

//SIGNUP
exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    const token = signToken(newUser._id);
    sendCookie(token, res);

    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: newUser,
      message: "User created",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

//LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error("Please provide email and password"));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new Error("Incorrect email or password"));
    }

    const token = signToken(user._id);

    sendCookie(token, res);

    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    //1. patikrinsime, ar atsisiunte token
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return next(
          new Error("You are not logged in. Please log in to get access")
        );
      }
    }
    //2. patikrinsime, ar token neigiamas (valid)
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    const exitingUser = await User.findById(decoded.id);
    req.user = exitingUser;
    next();
    //3. ar useris vis dar yra
    //4. ar useris nepakeite slaptazodzio
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return next(
          new Error("You do not have permission to perform this action")
        );
      }
      next();
    } catch (err) {
      res.status(403).json({
        status: "fail",
        message: err.message,
      });
    }
  };
};
