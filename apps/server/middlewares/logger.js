// middleware/logger.js

const logger = (req, res, next) => {
    console.log(`${req.method} ${res.statusCode} ${req.originalUrl}`);
    next();  // Pass control to the next middleware or route handler
  };
  
export default logger;
  