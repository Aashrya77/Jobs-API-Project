require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith(`Bearer `)) {
    throw new UnauthenticatedError("Authentication invalid ");
  }
  const token = authHeader.split(" ")[1];  
  try { 
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: data.userId, name: data.name }; 
    next();  
  } catch (error) { 
    throw new UnauthenticatedError("Authentication invalid"); 
  }    
};

module.exports = authentication; 
