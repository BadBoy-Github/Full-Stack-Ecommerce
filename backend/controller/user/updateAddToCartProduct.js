const addToCartModel = require("../../models/cartProduct")


const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUser = req?.userId
        const addToCartProductId = req?.body?._id

        const qty = req?.body?.quantity

        const updateProduct = await addToCartModel.updateOne({ _id: addToCartProductId },{
            ...(qty && {quantity: qty})
        })

        res.json({
            message: "Product updated",
            data: updateProduct,
            success: true,
            error: false,
        })

    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false,
        })

    }
}

module.exports = updateAddToCartProduct