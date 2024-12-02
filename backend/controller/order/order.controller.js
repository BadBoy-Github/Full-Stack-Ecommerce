const orderModel = require("../../models/orderProductModel")

const orderController = async(request, response)=>{
    try {
        const currentUserId = request.userId

        const orderList = await orderModel.find({ userId : currentUserId }).sort({ createdAt : -1 })

        response.json({
            data : orderList,
            message : "Order list",
            success : true,
            error : false
        })
        
    } catch (error) {
        response.status(500).json({
            message : error.message || error,
            success : false,
            error : true,
        })
    }
}

module.exports = orderController