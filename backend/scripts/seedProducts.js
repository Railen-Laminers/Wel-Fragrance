const mongoose = require("mongoose");
const Product = require("../models/Product");

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wel-fragrance";
  await mongoose.connect(uri);
};

const seedProducts = async () => {
  try {
    await connectDB();

    const count = await Product.countDocuments();
    if (count > 0) {
      console.log(`Products already exist (${count}). Skipping seed.`);
      process.exit(0);
    }

    const products = [
      {
        name: "Paradoxie",
        notes: "Floral fruity • 100% pure oil fragrance",
        price: "₱500",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80",
        tag: "New",
        featured: true,
        gender: "Women",
        story: "A luminous floral fragrance that balances bright citrus with a soft velvet finish.",
        type: 1,
        isActive: true,
      },
      {
        name: "Litz",
        notes: "Oriental floral • For women",
        price: "₱500",
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80",
        tag: "Featured",
        featured: true,
        gender: "Women",
        story: "A rich signature scent with warmth, spice, and polished floral notes.",
        type: 2,
        isActive: true,
      },
      {
        name: "Nicol",
        notes: "Woody citrus • For men",
        price: "₱500",
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80",
        tag: "",
        featured: false,
        gender: "Men",
        story: "Fresh, confident, and crisp with a modern woody trail.",
        type: 1,
        isActive: true,
      },
      {
        name: "Greedy Choco",
        notes: "Sweet fruity floral • For women",
        price: "₱500",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
        tag: "",
        featured: false,
        gender: "Women",
        story: "An indulgent fragrance with sweetness, warmth, and a soft floral finish.",
        type: 1,
        isActive: true,
      },
    ];

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products.`);
  } catch (error) {
    console.error("Failed to seed products", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seedProducts();
