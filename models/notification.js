const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {

        elementID:String,
        type:String,
        NotificationChecking: {
            type: Boolean,
            default: false,
        },


    },
    { timestamps: true }
);

module.exports = mongoose.model('notification', notificationSchema);