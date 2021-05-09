const express = require("express");

const {Product} = require("../models/product");
const multer = require('multer')
const productRoute = new express.Router();
const sharp = require('sharp')

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            return cb(new Error('Please upload an image !'))
        }
        cb(undefined, true)
    }
})

productRoute.get('/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const product = await Product.findOne({ _id })
        if (!product) {
            res.status(404).send()
        }
        res.send(product)
    } catch (e) {
        res.status(500).send(e)
    }
})

productRoute.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        if (!products) {
            res.status(404).send()
        }
        res.send(products)
    } catch (e) {
        res.status(500).send(e)
    }
})

productRoute.post('/', upload.single('image'), async (req, res) => {
    req.body.image = await sharp(req.file.buffer).resize(250, 250).png().toBuffer()
    const product = new Product({
        ...req.body
    })
    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

productRoute.delete('/:id', async (req, res) => {
    const productId = req.params.id
    Product.findOneAndDelete({_id: productId}, (err, docs) => {
        if (err) {
            res.status(400).send(err)
        }
        else {
            res.status(200).send({
            "message": "deleted successfully",
            "deletedProduct": docs
        })}
    })
})

module.exports.productRoute = productRoute;