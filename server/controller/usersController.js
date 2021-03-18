const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret_my_token';

exports.postRegister = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        const existsUser = await User.findOne({email});
        if (existsUser) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            const hashPassword = await bcryptjs.hash(password, 12);
            const user = await User({name, email, password: hashPassword});
            await user.save();
            const payload = { id: user._id };
            jwt.sign(payload, jwtSecret, (error, token) => {
                return res.json({token, user});
            })
        }
    } catch (error) {
        return res.status(400).json({ message: "Server Error" });
    }
}

exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User Not Found' });
        }
    
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
    
        const payload = { id: user._id };
        jwt.sign(payload, jwtSecret, (error, token) => {
            return res.json({token, user});
        })   
    } catch (error) {
        return res.status(400).json({ message: "Server Error" });
    }
}

exports.getProfile = (req, res, next) => {
    return res.json({ user: req.user });
}

exports.putProfile = async (req, res, next) => {
    const { name, password } = req.body;
    
    try {
        let user = await User.findById({ _id: req.user.id });
        if (password) {
            const hashPassword = await bcryptjs.hash(password, 12);
            user.password = hashPassword;
        }
        if (name) {
            user.name = name;
        }
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: "Server Error" });
    }
}

exports.putProduct = async (req, res, next) => {
    const productId = req.params.productId;
    const quantity = Number(req.params.quantity);

    try {
        let user = await User.findById({ _id: req.user._id });
        let product = await Product.findById({ _id: productId}).select('-countInStock -rating -numReviews -reviews');
        
        // bug here
        //let existItem = user.cart.find(item => item._id.toString() === productId.toString());
        //const existItemIndex = user.cart.findIndex(item => item._id.toString() === productId.toString());
        
        /* if (existItem) {
            existItem.quantity = existItem.quantity + quantity;
            user.cart[existItemIndex] = existItem;
            //console.log(existItem);
            await user.save();
            return res.status(200).json(user.cart);
        } else { */
            product.quantity = quantity;
            product.price = product.price * quantity 
            user.cart.unshift(product);
            await user.save();
            return res.status(200).json(user.cart);
        //}

    } catch (error) {
        return res.status(400).json({ message: 'Server Error' });
    }
}

exports.deleteProduct = async (req, res, next) => {
    const productId = req.params.productId;

    try {
        let user = await User.findById({ _id: req.user._id });
        const updateCart = user.cart.filter(item => item._id.toString() !== productId.toString());
        user.cart = updateCart;
        await user.save();
        return res.status(200).json(user.cart);
    } catch (error) {
        return res.status(400).json({ message: 'Server Error' });
    }
}

exports.postOrder = async (req, res, next) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        shippingPrice, 
        totalPrice 
    } = req.body;

    const order = await Order({
        user: req.user._id,
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        shippingPrice, 
        totalPrice
    });
    await order.save();
    return res.status(200).json(order);   
}

exports.getOrders = async (req, res, next) => {
    try {
        const userOrders = await Order.find({ user: req.user.id });
        return res.status(200).json(userOrders);
    } catch (error) {
        return res.status(400).json({ message: 'Server Error' });
    }
     
}