const mongoose= require ('mongoose')

var previousorder= new mongoose.Schema({

    'orderId':String,
    'userId': String,
    
    'products':[{
        'img':String,
        'productName':String,
        'price':Number,
        'quantity':Number
    }],
    'total':Number,
    'paymentMethod':String,

},{timestamps:true});

module.exports=mongoose.model("PreviousOrder",previousorder);