const mongoose = require('mongoose');

const cartitemSchema = new mongoose.Schema(
  
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        price: Number,
        useruid: String,
      },
      
  { timestamps: true }
   
   
);

module.exports = mongoose.model('cartitem', cartitemSchema);