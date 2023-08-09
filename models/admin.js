const mongoose = require('mongoose')

const bcrypt = require('bcrypt') // crypte psw


const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [ "admin","vendor"],
        required: true,
    },
    isActive: {

        type: Boolean,
        default: true,
        required: true
    },
    avatar: {
        type: String,
        default:"https://firebasestorage.googleapis.com/v0/b/profound-ripsaw-367620.appspot.com/o/adminsimages%2Fpngegg.png?alt=media&token=dd78229d-653c-44ec-8131-23aba0871152&fbclid=IwAR3WpgF9vAxWfdFq_yJx6L_s8F3CrekWy2w8_VVjgSo6g71OEf8RBxSbBiA,",
        required: false
    },

},
    {
        timestamps: true,
    },
    )
    adminSchema.pre('save', async function (next) {
        if (!this.isModified('password')) return next()
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    })

 

module.exports = mongoose.model('Admin', adminSchema)