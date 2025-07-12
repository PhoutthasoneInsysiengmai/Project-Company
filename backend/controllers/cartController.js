import userModel from '../models/userModel.js';

// ✅ Add item to user cart
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId); // ✅ แก้ตรงนี้

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "ERROR" });
    }
};

// ✅ Remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId); // ✅ แก้ตรงนี้

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "ERROR" });
    }
};

// ✅ Get user cart data
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId); // ✅ แก้ตรงนี้

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "ERROR" });
    }
};

export { addToCart, removeFromCart, getCart };
