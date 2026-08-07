import Cart from "../models/Cart.js";

/* ==========================
   Get User Cart
========================== */

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id }).populate("product");

    res.status(200).json({
      success: true,
      count: cart.length,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Add To Cart
========================== */

export const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const existingItem = await Cart.findOne({
      user: req.user._id,
      product,
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart Updated",
        cart: existingItem,
      });
    }

    const cart = await Cart.create({
      user: req.user._id,
      product,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Added To Cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Update Quantity
========================== */

export const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      {
        new: true,
      }
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quantity Updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Remove From Cart
========================== */

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item Removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};