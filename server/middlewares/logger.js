// middleware/logger.js

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();  // Pass control to the next middleware or route handler
  };
  
export default logger;
  