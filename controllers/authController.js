import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const registerUser = async(req, res) => {
    try {
        const { password, name, email } = req.body;
       
      if (!name && !password && !email) {
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
        const secret = process.env.SECRET;
        const user  = await User.findOne({ email }).lean();
        if (!user) {
           return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: "Authentication failed" });
        }
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });
         res.json({ token }); 
    } catch (err) {
        console.log(err)
    }     
}

export const getProfile = (req, res)=>{
    res.status(200).json({ message: "Protected route accessed" });
}