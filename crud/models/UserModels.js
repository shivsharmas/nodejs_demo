const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    username:{
        type:String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
        unique: true,
    }
});

userSchema.set("timestamps", true);
userSchema.index({createAt: 1});

// JWT 
userSchema.method.getJWTToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// hashing
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// compare password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("user", userSchema)