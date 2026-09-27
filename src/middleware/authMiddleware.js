import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

//Read the token from the request
//  check if the token is valid
export const authMiddleware = async (req, res, next) => {
  console.log("authMiddleware called");
  let token;
  if (req.headers.authorization &&
     req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; //["Bearer", "token"]
  } else if (req.cookies?.jwt) {
    token = req.cookies?.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }
  try {
    //verify the token and extract the user ID from it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res.status(401).json({ error: "user no longer exists" });
    }

    req.user = user; // Attach the user object to the request for further use in the route handler
    return next(); // Call next() to pass control to the next middleware or route handler
  } catch (err) {}
  return res.status(401).json({error:"Not authorized, token failed"});
};
