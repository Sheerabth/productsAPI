const express = require("express");

const {Product} = require("../models/product");
const {Cart} = require("../models/cart")
const {authenticate} = require('../middlewares/auth');

const cartRoute = new express.Router();

cartRoute.get('/', authenticate, async (req, res) => {

    let userId = req.user_id

    try {
        const cart = await Cart.findOne({ userId })
        if (!cart) {
            res.status(404).send()
        }
        const cartProducts = []
        for(let product of cart.products) {
            const cartProduct = await Product.findOne({ _id: product.productId })
            cartProducts.push({
                productId: cartProduct._id,
                productName : cartProduct.name,
                unitPrice: cartProduct.unitPrice,
                quantity: product.quantity
            })
        }
        res.send({ cartProducts })
    } catch (e) {
        res.status(500).send(e)
    }
})

cartRoute.post('/', authenticate, async (req, res) => {
    let productId = req.body.productId
    let userId = req.user_id
    let quantity = req.body.quantity ? req.body.quantity : 1

    const product = Product.findById(productId)
    if (product) {
        try{
            let cartMessage = {}
            const cartWithProduct = await Cart.findOne({userId, products : {$elemMatch : {productId}}})
            if(cartWithProduct){
                for(let product in cartWithProduct.products) {
                    if (String(cartWithProduct.products[product].productId) === productId) {
                        cartWithProduct.products[product].quantity += 1
                    }
                }
                await cartWithProduct.save()
                cartMessage = cartWithProduct
            }else {
                const cart = await Cart.findOne({userId})
                cart.products.push({
                    productId,
                    quantity
                })
                await cart.save()
                cartMessage = cart
            }
            res.status(200).send({
                "message" : "Done.",
                "cartProducts" : cartMessage
            })
        }catch (err) {
            res.status(400).send({
                "Message" : err
            })
        }
    }
})

cartRoute.patch('/:id', authenticate, async (req, res) => {
    let productId = req.params.id
    let userId = req.user_id

    try {
        const cart = await Cart.updateOne({
            userId,
            products: {
                $elemMatch: { productId }
            }
        }, {
            $set: { "products.$.quantity": req.body.quantity }
        })
        res.status(200).send({
            "message": "modified successfully",
            "cartStatus": cart
        })
    } catch (err) {
        res.status(400).send(err)
    }
})

cartRoute.delete('/:id', authenticate, async (req, res) => {
    let productId = req.params.id
    let userId = req.user_id

    try {
        const cart = await Cart.updateOne({userId}, {
            $pull: {  products: { productId }}
        })
        res.status(200).send({
            "message": "deleted successfully",
            "cartStatus": cart
        })
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports.cartRoute = cartRoute;