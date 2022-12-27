const asyncHandler = require("express-async-handler");
const Coupon = require("../models/coupon");

// @desc Create new coupon
// @route POST /api/coupons
// @access Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
  const { coupon, value } = req.body;
  const couponVal = new Coupon({
    user: req.user._id,
    coupon,
    value,
  });
  const createdCoupon = await couponVal.save();
  res.status(201).json(createdCoupon);
});

// @desc Get all coupons
// @route GET /api/coupons
// @access Private/Admin
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({});
  res.json(coupons);
});

// @desc Get Complaint by id
// @route GET /api/complaints/:id
// @access Private/Admin
const getCouponById = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (coupon) {
    res.json(coupon);
  } else {
    res.status(404);
    throw new Error("Coupon not found");
  }
});

// @desc Delete Coupon by id
// @route DELETE /api/coupons/:id
// @access Private/Admin
const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (coupon) {
    await coupon.remove();
    res.json({ message: "Coupon removed" });
  } else {
    res.status(404);
    throw new Error("Coupon not found");
  }
});

// @desc Delete Coupon by id
// @route DELETE /api/coupons/:id
// @access Private/Admin
const updateCoupon = asyncHandler(async (req, res) => {
  const { coupon, value } = req.body;
  const couponRes = await Coupon.findById(req.params.id);
  if (couponRes) {
    couponRes.coupon = coupon;
    couponRes.value = value;
    const updatedCoupon = await couponRes.save();
    res.json(updatedCoupon);
  } else {
    res.status(404);
    throw new Error("Coupon not found");
  }
});

module.exports = {
  getCoupons,
  getCouponById,
  createCoupon,
  deleteCoupon,
  updateCoupon,
};
