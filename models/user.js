const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    displayName: String,
    
    email: String,

    photoURL:String,

    phone: Number,
    
    adress : String,

    city:String,

    uid: String,


    
    
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);