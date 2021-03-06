const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Order = require("../models/order");
const Complaint = require("../models/complaint");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

// Middleware to make sure only the user that has this order can delete it
const order = asyncHandler(async (req, res, next) => {
  req.order = await Order.findById(req.params.id);
  if (req.user.id === req.order.user.toString()) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized for this operation");
  }
});

// Middleware to make sure only the user that opened the ticket can delete it
const ticket = asyncHandler(async (req, res, next) => {
  req.complaint = await Complaint.findById(req.params.id);
  if (req.user.id === req.complaint.user.toString()) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized for this operation");
  }
});

module.exports = { protect, admin, order, ticket };
