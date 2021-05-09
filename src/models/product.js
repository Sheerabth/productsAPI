const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: Buffer
    },
    description: {
        type: String,
        trim: true,
        default: "None"
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model('products', productSchema)

module.exports.Product = Product
