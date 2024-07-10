const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {

    try {

        const userExists = await User.findOne({ email: req.body.email });

        if (userExists) {
            return res.json({
                success : false,
                message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.json(error);
    }

});

router.post("/login", async (req, res) => {
    const user = await User.findOne({email : req.body.email});
    if(!user){
        res.send({
            success : false,
            message : "User not found , please register first"
        })
    }

    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword){
        res.send({
            success : false,
            message : "Invalid Password"
        })
    }

    res.status(200).send({
        success : true,
        message : "User logged in successfully"
    });
});


module.exports = router;