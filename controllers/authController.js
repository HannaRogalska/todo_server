import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../helpers/token.js";

export const registerUser = async(req, res) => {
    try {
        const { password, name, email } = req.body;
       
      if (!name || !password || !email) {
        return res.status(400).json({ message: "Email, name and password required" });
      }
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password, salt);
        await User.create({ user: name, password: hashPassword, email: email });
        res.status(201).json({ message: "User created" });
    } catch (err) {
        console.log(`Server error: ${err}`)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { password, email} = req.body;
        const user  = await User.findOne({ email })
        if (!user) {
           return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: "Authentication failed" });
        }
        const accessToken = createAccessToken({ userId: user._id });
       
        const refreshToken = createRefreshToken({ userId: user._id });
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
         res.json({ accessToken }); 
    } catch (err) {
        console.log(err)
    }     
}


export const getProfile = async (req, res)=>{
   try {
   const user = await User.findById(req.userId).select(
     "-password -refreshToken"
   );
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.json(user);
   } catch (err) {
     console.log("Profile error:", err);
     return res.status(500).json({ message: "Server error" });
   }
}