import User from "../models/User.js";
import bcrypt from "bcrypt"

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