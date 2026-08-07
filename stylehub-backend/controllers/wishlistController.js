import Wishlist from "../models/Wishlist.js";

/* ==========================
   Get Wishlist
========================== */

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user._id,
    }).populate("product");

    res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Add To Wishlist
========================== */

export const addToWishlist = async (req, res) => {
  try {
    const { product } = req.body;

    const exists = await Wishlist.findOne({
      user: req.user._id,
      product,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user._id,
      product,
    });

    res.status(201).json({
      success: true,
      message: "Added to Wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Remove From Wishlist
========================== */

export const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist Item Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Removed From Wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};