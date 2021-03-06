const asyncHandler = require("express-async-handler");
const Order = require("../models/order");
const Product = require("../models/product");

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc  Get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc  Cancel a single order for current user
// @route DELETE /api/orders/:id
// @access Private
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    await order.remove();
    res.json({ message: "Order removed" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc  Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrdertoPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.orderItems.map(async (item) => {
    const product = await Product.findById(item.product.toString());
    if ((product.countInStock = 0 || product.countInStock < item.qty)) {
      throw new Error("Product out of stock");
    } else {
      const newStock = product.countInStock - item.qty;
      product.countInStock = newStock;
      await product.save();
    }
    return newStock;
  });

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc  Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrdertoDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc  Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc  Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrdertoPaid,
  updateOrdertoDelivered,
  getMyOrders,
  getOrders,
  cancelOrder,
};
