const Product = require("../models/productModel");
const imageFile = require("../utils/imageFile");

module.exports = {
  createProduct: async (req, res) => {
    try {
      if (req.file) {
        req.body.image = await imageFile.uploadSingle({
          imageFile: req.file,
          request: req,
        });

        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json({
          status: true,
          message: "Product added successfully",
          data: newProduct,
        });
      } else {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json({
          status: true,
          message: "Product added successfully",
          data: newProduct,
        });
      }
    } catch (error) {
      console.error("Error adding Product:", error);
      res.status(500).json({
        status: false,
        message: "Failed to add Product",
        error: error.message,
      });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Error fetching products" });
      console.log(error);
    }
  },
};

// const uploadProduct = async (req, res) => {
// try {
// console.log(req.body);
//   const { name, description, price, type, status, category, stock } =
//     req.body;
//   let imageUrl = null;
//   let cloudinaryId = null;

//   if (req.file) {
//     const uploadResponse = await cloudinary.uploader.upload(req.file.path);
//     imageUrl = uploadResponse.secure_url;
//     cloudinaryId = uploadResponse.public_id;
//   }

//   const parsedStock = typeof stock === "string" ? JSON.parse(stock) : stock;

//   const product = new Product({
//     name,
//     description,
//     price,
//     type,
//     status,
//     category,
//     image: imageUrl,
//     cloudinaryId,
//     stock: parsedStock,
//   });

//   await product.save();
//   res.status(201).json(product);
// } catch (error) {
//   res.status(500).json({ message: error.message });
// }

// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const { name, description, price, type, status, category, stock } =
//       req.body;
//     let imageUrl = null;
//     let cloudinaryId = null;

//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     if (req.file) {
//       if (product.cloudinaryId) {
//         await cloudinary.uploader.destroy(product.cloudinaryId);
//       }
//       const uploadResponse = await cloudinary.uploader.upload(req.file.path);
//       imageUrl = uploadResponse.secure_url;
//       cloudinaryId = uploadResponse.public_id;
//     }

//     product.name = name || product.name;
//     product.description = description || product.description;
//     product.price = price || product.price;
//     product.type = type || product.type;
//     product.status = status || product.status;
//     product.category = category || product.category;
//     product.stock = stock ? JSON.parse(stock) : product.stock;
//     product.image = imageUrl || product.image;
//     product.cloudinaryId = cloudinaryId || product.cloudinaryId;

//     await product.save();
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     if (product.cloudinaryId) {
//       await cloudinary.uploader.destroy(product.cloudinaryId);
//     }

//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   uploadProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
// };
