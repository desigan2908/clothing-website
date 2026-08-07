import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

/* ==========================
   MongoDB Connection
========================== */

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

/* ==========================
   Products
========================== */

const products = [

  {
    title: "Nike Cotton T-Shirt",
    description: "Premium cotton t-shirt for men.",
    brand: "Nike",
    category: "Men",
    price: 2500,
    discountPercentage: 10,
    stock: 50,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Black", "White"],
    featured: true,
    bestseller: true,
    newArrival: true,
  },

  {
    title: "Adidas Hoodie",
    description: "Warm and stylish hoodie.",
    brand: "Adidas",
    category: "Men",
    price: 4500,
    discountPercentage: 15,
    stock: 40,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Grey", "Black"],
    featured: true,
    bestseller: false,
    newArrival: true,
  },

  {
    title: "Puma Running Shoes",
    description: "Comfortable running shoes.",
    brand: "Puma",
    category: "Shoes",
    price: 6500,
    discountPercentage: 20,
    stock: 35,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["White", "Blue"],
    featured: true,
    bestseller: true,
    newArrival: false,
  },

  {
    title: "Levi's Slim Jeans",
    description: "Classic blue denim jeans.",
    brand: "Levi's",
    category: "Jeans",
    price: 3800,
    discountPercentage: 10,
    stock: 60,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue"],
    featured: false,
    bestseller: true,
    newArrival: false,
  },

  {
    title: "Zara Women's Dress",
    description: "Elegant casual dress.",
    brand: "Zara",
    category: "Women",
    price: 5200,
    discountPercentage: 12,
    stock: 30,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c"
    ],
    sizes: ["S", "M", "L"],
    colors: ["Red", "Black"],
    featured: true,
    bestseller: false,
    newArrival: true,
  },

  {
    title: "H&M Jacket",
    description: "Winter fashion jacket.",
    brand: "H&M",
    category: "Jackets",
    price: 7200,
    discountPercentage: 18,
    stock: 20,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    images: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Brown", "Black"],
    featured: false,
    bestseller: true,
    newArrival: true,
  },

  {
    title: "Tommy Hilfiger Shirt",
    description: "Formal men's shirt.",
    brand: "Tommy Hilfiger",
    category: "Shirts",
    price: 4100,
    discountPercentage: 8,
    stock: 45,
    rating: 4.4,
    thumbnail: "https://images.unsplash.com/photo-1603252109303-2751441dd157",
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["White", "Blue"],
    featured: false,
    bestseller: false,
    newArrival: true,
  },

  {
    title: "Calvin Klein Polo",
    description: "Premium polo t-shirt.",
    brand: "Calvin Klein",
    category: "Men",
    price: 3900,
    discountPercentage: 10,
    stock: 50,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1581655353564-df123a1eb820",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820"
    ],
    sizes: ["M", "L"],
    colors: ["Navy", "White"],
    featured: true,
    bestseller: false,
    newArrival: false,
  },

  {
    title: "Women's Handbag",
    description: "Luxury leather handbag.",
    brand: "Michael Kors",
    category: "Accessories",
    price: 8400,
    discountPercentage: 20,
    stock: 18,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
    ],
    sizes: ["M"],
    colors: ["Black"],
    featured: true,
    bestseller: true,
    newArrival: true,
  },

  {
    title: "Kids Hoodie",
    description: "Soft cotton hoodie for kids.",
    brand: "Puma",
    category: "Kids",
    price: 2800,
    discountPercentage: 5,
    stock: 30,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
    ],
    sizes: ["S", "M"],
    colors: ["Yellow", "Blue"],
    featured: false,
    bestseller: true,
    newArrival: false,
  },

    {
    title: "Adidas Sports Shorts",
    description: "Lightweight sports shorts for training.",
    brand: "Adidas",
    category: "Men",
    price: 2200,
    discountPercentage: 10,
    stock: 55,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Grey"],
    featured: false,
    bestseller: true,
    newArrival: false,
  },

  {
    title: "Nike Air Sneakers",
    description: "Stylish sneakers with superior comfort.",
    brand: "Nike",
    category: "Shoes",
    price: 7800,
    discountPercentage: 15,
    stock: 40,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
    images: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["White", "Red"],
    featured: true,
    bestseller: true,
    newArrival: true,
  },

  {
    title: "Women's Casual Top",
    description: "Comfortable everyday fashion top.",
    brand: "H&M",
    category: "Women",
    price: 1800,
    discountPercentage: 8,
    stock: 60,
    rating: 4.4,
    thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b"
    ],
    sizes: ["S", "M", "L"],
    colors: ["Pink", "White"],
    featured: false,
    bestseller: false,
    newArrival: true,
  },

  {
    title: "Levi's Denim Jacket",
    description: "Classic denim jacket for all seasons.",
    brand: "Levi's",
    category: "Jackets",
    price: 6500,
    discountPercentage: 12,
    stock: 25,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Blue"],
    featured: true,
    bestseller: false,
    newArrival: true,
  },

  {
    title: "Puma Sweatshirt",
    description: "Soft fleece sweatshirt.",
    brand: "Puma",
    category: "Men",
    price: 3600,
    discountPercentage: 10,
    stock: 35,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1523398002811-999ca8dec234",
    images: [
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234"
    ],
    sizes: ["M", "L"],
    colors: ["Grey", "Black"],
    featured: false,
    bestseller: true,
    newArrival: false,
  },

  {
    title: "Women's Sneakers",
    description: "Fashion sneakers for women.",
    brand: "Adidas",
    category: "Shoes",
    price: 7200,
    discountPercentage: 18,
    stock: 28,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772"
    ],
    sizes: ["S", "M", "L"],
    colors: ["White", "Pink"],
    featured: true,
    bestseller: true,
    newArrival: true,
  },

  {
    title: "Men's Formal Shirt",
    description: "Premium office wear shirt.",
    brand: "Arrow",
    category: "Shirts",
    price: 3200,
    discountPercentage: 5,
    stock: 50,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Blue", "White"],
    featured: false,
    bestseller: false,
    newArrival: true,
  },

  {
    title: "Women's Maxi Dress",
    description: "Elegant floral maxi dress.",
    brand: "Zara",
    category: "Women",
    price: 5800,
    discountPercentage: 14,
    stock: 22,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c"
    ],
    sizes: ["S", "M", "L"],
    colors: ["Blue", "Green"],
    featured: true,
    bestseller: false,
    newArrival: true,
  },

  {
    title: "Kids T-Shirt",
    description: "Colorful cotton t-shirt for kids.",
    brand: "Nike",
    category: "Kids",
    price: 1600,
    discountPercentage: 5,
    stock: 45,
    rating: 4.4,
    thumbnail: "https://images.unsplash.com/photo-1512436991641-6745cdb1723",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723"
    ],
    sizes: ["S", "M"],
    colors: ["Yellow", "Blue"],
    featured: false,
    bestseller: true,
    newArrival: false,
  },

  {
    title: "Casio Wrist Watch",
    description: "Elegant analog wrist watch.",
    brand: "Casio",
    category: "Accessories",
    price: 4900,
    discountPercentage: 20,
    stock: 18,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    ],
    sizes: ["M"],
    colors: ["Black"],
    featured: true,
    bestseller: true,
    newArrival: true,
  },

    {
    title: "Ray-Ban Sunglasses",
    description: "Stylish UV protection sunglasses.",
    brand: "Ray-Ban",
    category: "Accessories",
    price: 5400,
    discountPercentage: 15,
    stock: 20,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    ],
    sizes: ["M"],
    colors: ["Black"],
    featured: true,
    bestseller: true,
    newArrival: true,
  },

  {
    title: "Zara Women's Blazer",
    description: "Elegant office blazer.",
    brand: "Zara",
    category: "Women",
    price: 6900,
    discountPercentage: 12,
    stock: 18,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b"
    ],
    sizes: ["S","M","L"],
    colors: ["Black"],
    featured: true,
    bestseller: false,
    newArrival: true,
  },

  {
    title: "Nike Joggers",
    description: "Comfortable jogging pants.",
    brand: "Nike",
    category: "Men",
    price: 3300,
    discountPercentage: 8,
    stock: 50,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1506629905607-d9b1c9c3d7d5",
    images: [
      "https://images.unsplash.com/photo-1506629905607-d9b1c9c3d7d5"
    ],
    sizes: ["M","L","XL"],
    colors: ["Black","Grey"],
    featured: false,
    bestseller: true,
    newArrival: false,
  },

  {
    title: "Adidas Track Jacket",
    description: "Classic sports jacket.",
    brand: "Adidas",
    category: "Jackets",
    price: 5800,
    discountPercentage: 10,
    stock: 30,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    images: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
    ],
    sizes: ["M","L","XL"],
    colors: ["Blue"],
    featured: true,
    bestseller: true,
    newArrival: true,
  },

  {
    title: "Levi's Black Jeans",
    description: "Slim fit black jeans.",
    brand: "Levi's",
    category: "Jeans",
    price: 4200,
    discountPercentage: 10,
    stock: 45,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
    ],
    sizes: ["S","M","L","XL"],
    colors: ["Black"],
    featured: false,
    bestseller: true,
    newArrival: false,
  },

  {
    title: "Women's Sandals",
    description: "Fashion sandals.",
    brand: "Aldo",
    category: "Shoes",
    price: 3100,
    discountPercentage: 18,
    stock: 30,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2"
    ],
    sizes: ["S","M","L"],
    colors: ["Brown"],
    featured: false,
    bestseller: false,
    newArrival: true,
  },

  {
    title: "Puma Cap",
    description: "Sports cap.",
    brand: "Puma",
    category: "Accessories",
    price: 1200,
    discountPercentage: 5,
    stock: 70,
    rating: 4.4,
    thumbnail: "https://images.unsplash.com/photo-1521369909029-2afed882baee",
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee"
    ],
    sizes: ["M"],
    colors: ["Black","White"],
    featured: false,
    bestseller: true,
    newArrival: false,
  },

  {
    title: "Women's Hoodie",
    description: "Soft fleece hoodie.",
    brand: "H&M",
    category: "Women",
    price: 3900,
    discountPercentage: 15,
    stock: 35,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
    ],
    sizes: ["S","M","L"],
    colors: ["Pink","Grey"],
    featured: true,
    bestseller: false,
    newArrival: true,
  },

  {
    title: "Kids Jacket",
    description: "Warm jacket for kids.",
    brand: "Nike",
    category: "Kids",
    price: 3400,
    discountPercentage: 8,
    stock: 28,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
    ],
    sizes: ["S","M"],
    colors: ["Blue"],
    featured: false,
    bestseller: true,
    newArrival: false,
  },

  {
    title: "Tommy Hilfiger Polo Shirt",
    description: "Premium casual polo.",
    brand: "Tommy Hilfiger",
    category: "Men",
    price: 4600,
    discountPercentage: 10,
    stock: 40,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1581655353564-df123a1eb820",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820"
    ],
    sizes: ["M","L","XL"],
    colors: ["White","Navy"],
    featured: true,
    bestseller: true,
    newArrival: true,
  }



];


const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("✅ 30 Products Imported Successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

importData();