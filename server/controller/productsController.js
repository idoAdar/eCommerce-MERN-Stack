const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        if (products === []) {
            return res.status(400).json({message: 'No Products Found'});
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({message: 'Server Error'});
    }
}

exports.getProduct = async (req, res, next) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById({ _id: productId });
        if (!product) {
            return res.status(400).json({message: 'No Product Found'});
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({message: 'Server Error'});
    }
}

exports.postNewProduct = async (req, res, next) => {
    try {
        const newProduct = await Product({...req.body});
        await newProduct.save();
        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(400).json({message: 'Server Error'});
    }
}