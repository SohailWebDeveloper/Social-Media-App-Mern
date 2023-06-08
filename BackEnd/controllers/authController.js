import express from "express";
import userModel from "../models/Users.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, lName, password, confirm_password, email } = req.body;

    // Checking if user is already registered
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already registered",
      });
    }
    const hashedPassword = await hashPassword(password);
    let user = new userModel({
      name,
      lName,
      password: hashedPassword,
      confirm_password,
      email,
    });
    let result = await user.save();
    res.status(200).send({ message: "SignUp Successfully", result });
  } catch (error) {
    res.send({ error });
  }
};

export const loginController = async (req, res) => {
  try {
    // only email and password required to login / destructure from req.body
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ login_success: false, message: "invalid email or password" });
    }

    // checking DB if a specific email address is available in DB or not
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.send({
        message: "invalid email address",
        login_success: false,
      });
    }

    // upon availability of data, comparing plain password with hashed password already available in DB
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.send({
        message: "Password does not match",
        login_success: false,
      });
    }

    // JWT Token assigning if password match with the plain and hashed password

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    res.status(200).send({
      login_success: true,
      name: user.name,
      email: user.email,
      lName: user.lName,
      _id: user._id,

      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      login_success: false,
      message: "Error in login",
      error,
    });
  }
};

// export const singleUser=async(req,res)=>{
//   const result = await userModel.find({_id:req.params.id});
//   res.status(201).send(result)
// }

export const singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    let result = await userModel.findOne({ _id: id })
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
