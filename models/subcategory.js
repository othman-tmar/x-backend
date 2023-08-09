const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'SubCategory must be unique'],
      minlength: [2, 'To short SubCategory name'],
      maxlength: [32, 'To long SubCategory name'],
    },
    image: String,
   
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'category',
      required: [true, 'Subcategory must be belong to parent category'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('subcategory', subcategorySchema);