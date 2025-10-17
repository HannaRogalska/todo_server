import jwt from "jsonwebtoken";

export const createAccessToken = ( userId ) => {
  return jwt.sign( userId, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });
};
export const createRefreshToken = ( userId ) => {
  return jwt.sign(userId, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
export const refreshToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });
    jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
      const userId = decoded.userId;
      const user = await User.findById(userId);
      if (!user || user.refreshToken !== token) {
        return res.status(403).json({ message: "Refresh token revoked" });
      }
      const accessToken = createAccessToken({ userId: user._id });
      return res.json({ accessToken });
    });
  } catch (err) {
     console.log("Refresh error:", err);
     return res.status(500).json({ message: "Server error" });
  }
};
