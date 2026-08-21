import User from "../models/User.js";

/* ==========================
   Register User
========================== */

export const registerUser = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      phone,
      address,
    } = req.body;

    // Clean input
    name = name?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone: phone || "",
      address: address || "",
    });

    const token = user.generateToken();

    return res.status(201).json({
      success: true,
      message: "Registration Successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "REGISTER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Registration Failed",
    });
  }
};


/* ==========================
   Login User
========================== */

export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Clean input
    email = email?.trim().toLowerCase();
    password = password?.trim();

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    console.log(
      "LOGIN ATTEMPT:",
      email
    );

    /*
      IMPORTANT:

      password has select:false in User model.

      Therefore we MUST use:
      .select("+password")
    */

    const user = await User.findOne({
      email,
    }).select("+password");

    // User doesn't exist
    if (!user) {
      console.log(
        "LOGIN FAILED: USER NOT FOUND"
      );

      return res.status(401).json({
        success: false,
        message:
          "Invalid Email or Password",
      });
    }

    console.log(
      "LOGIN USER FOUND:",
      user.email
    );

    // Compare password
    const isMatch =
      await user.matchPassword(password);

    if (!isMatch) {
      console.log(
        "LOGIN FAILED: PASSWORD DOES NOT MATCH"
      );

      return res.status(401).json({
        success: false,
        message:
          "Invalid Email or Password",
      });
    }

    console.log(
      "LOGIN PASSWORD MATCHED"
    );

    // Generate JWT
    const token = user.generateToken();

    console.log(
      "LOGIN SUCCESS:",
      user.email
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Login Failed",
    });
  }
};


/* ==========================
   Get Logged In User
========================== */

export const getProfile = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(
      "GET PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to get profile",
    });
  }
};


/* ==========================
   Update Profile
========================== */

export const updateProfile = async (
  req,
  res
) => {
  try {
    const {
      name,
      phone,
      address,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name?.trim()) {
      user.name = name.trim();
    }

    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    if (address !== undefined) {
      user.address = address.trim();
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Profile Update Failed",
    });
  }
};