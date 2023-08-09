const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
        price: Number,
      },
    ],
    productsNumber: Number,
    useruid: String,
    totalOrderPrice: Number,
    discount: Number,
    tax : Number,
    finalPrice: Number,
   
  },
  { timestamps: true }
);

module.exports = mongoose.model('order', orderSchema);
