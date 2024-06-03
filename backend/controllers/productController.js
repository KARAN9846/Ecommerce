const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


// Create Product -- Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


// Get All Products

exports.getAllProducts = catchAsyncErrors (async (req, res) => {

    const apiFeature = new ApiFeatures(Product.find(),req.query).search();

    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products
    })
})


// Get Product Details

exports.getProductDetails = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})



// exports.getProductDetails = async (req, res, next) => {
//     try {
//         const product = await Product.findById(req.params.id);

//         if (!product) {
//             return next(new ErrorHandler("Product Not Found", 404)); // Corrected 'ErrorHander' to 'ErrorHandler'
//         }

//         res.status(200).json({
//             success: true,
//             product
//         });
//     } catch (error) {
//         next(error); // Passes errors to the error handling middleware
//     }
// };



// Update Products -- Admin

exports.updateProduct = catchAsyncErrors (async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product Not Found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })

})


// Delete Product

exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product Not Found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
})


