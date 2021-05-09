const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    products: [{
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 1,
            validate(value) {
                if (value < 0) {
                    throw new Error("Only positive values are allowed")
                }
            }
        }
    }]
})

const Cart = mongoose.model('carts', cartSchema)
module.exports.Cart = Cart