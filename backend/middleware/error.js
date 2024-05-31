const ErrorHandler = require("../utils/errorhandler")

module.exports = (err,req,res,next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"



    // Wrong Mongodb Id Error

    if(err.name === "CastError") {
        const message = `Resource not fount. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}


// const ErrorHandler = require("../utils/errorhandler");

// module.exports = (err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal Server Error";

//     res.status(statusCode).json({
//         success: false,
//         message: message,
//         // Optionally include the error stack in development
//         // stack: process.env.NODE_ENV === 'development' ? err.stack : {}
//     });
// };
