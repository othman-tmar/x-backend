const express = require('express');
const router = express.Router();
const Admin = require("../models/admin")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



//Activation par email 
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'othman23.tmar@gmail.com',
        pass: 'ypfqbtyglczkkium'
    },
    tls: {
        rejectUnauthorized: false
    }
})


router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body

        if (!email || !password) {
            return res.status(404).send({ success: false, message: "All fields are required" })

        }

        let admin = await Admin.findOne({
            email
        }).select('+password').select('+isActive')

        if (!admin) {

            return res.status(404).send({ success: false, message: "Account doesn't exists" })

        } else {

            let isCorrectPassword = await bcrypt.compare(password, admin.password)
            if (isCorrectPassword) {

                delete admin._doc.password
                if (!admin.isActive) return res.status(200).send({
                    success:
 
                        false, message: 'Your account is inactive, Please contact your administrator'
                })
                /* 
                                const token = jwt.sign({
                                    iduser:
                
                                        user._id, name: user.firstname, role: user.role
                                }, process.env.SECRET, {
                                    expiresIn: "1h",
                                })
                 */
                const token = generateAccessToken(admin);
                const refreshToken = generateRefreshToken(admin);

                return res.status(200).send({ success: true, admin, token ,refreshToken })

            } else {

                return res.status(404).send({ success: false, message: "Please verify your credentials" })
            }

        }

    } catch (err) {
        return res.status(404).send({
            success: false, message: err.message

        })
    }

});


//Access Token
const generateAccessToken = (admin) => {
    return jwt.sign({ idadmin: admin._id, role: admin.role }, process.env.SECRET, {
        expiresIn: '1000s'
    })
}


// Refresh
const generateRefreshToken=(admin)=> {
    return jwt.sign({ idadmin: admin._id, role: admin.role },
        process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' })
}


//Refresh Route
router.post('/refreshToken', async (req, res,) => {
    console.log(req.body.refreshToken)
    const refreshtoken = req.body.refreshToken;
    if (!refreshtoken) {
        return res.status(404).send({ success: false, message: 'Token Not Found' });
    }
    else {
        jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, admin) => {
            if (err) {
                console.log(err)
                return res.status(406).send({ success: false, message: 'Unauthorized' });
            }
            else {
                const jwtToken = generateAccessToken(admin);
                const refreshToken = generateRefreshToken(admin);
                console.log("token-------", jwtToken);
                res.status(200).send({
                    success: true,
                    jwtToken,
                    refreshToken
                })
            }
        });
    }

});

/**
* as an admin i can disable or enable an account
*/
router.get('/status/edit/', async (req, res) => {
    try {
        let email = req.query.email
        let admin = await Admin.findOne({ email })
        admin.isActive = !admin.isActive
        admin.save()
        res.status(200).send({ success: true, admin })
    } catch (err) {
        return res.status(404).send({ success: false, message: err })
    }
});

//CRUD SERVICES
router.get('/', async (req, res,) => {
    try {
        const admins = await Admin.find({}, null, { sort: { '_id': -1 } })/* .select("-password"); */
        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
router.get('/:adminId',async(req, res)=>{
    try {
        const adm = await Admin.findById(req.params.adminId);
        
        res.status(200).json(adm);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete('/:adminId', async (req, res)=> {
    const  id  = req.params.adminId;
    await Admin.findByIdAndDelete(id);

    res.json({ message: "Admin deleted successfully." });

});

router.put('/:adminId', async (req, res) => {
    try {
        const adm = await Admin.findByIdAndUpdate(
            req.params.adminId,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        res.status(200).json(adm);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// créer un nouvel utilisateur
router.post('/register', async (req, res) => {
    try {
        let { email, password, firstname, lastname,avatar,role } = req.body
        const admin = await Admin.findOne({ email })
        if (admin) return res.status(404).send({
            success: false, message:

                "Admin already exists"
        })

        const newAdmin = new Admin({ email, password, firstname, lastname,avatar,role })
        const createdAdmin = await newAdmin.save()

        // Envoyer l'e-mail de confirmation de l'inscription
        var mailOption = {
            from: '"verify your email " <othman23.tmar@gmail.com>',
            to: newAdmin.email,
            subject: 'vérification your email ',
            html: `<h2>${newAdmin.firstname}! thank you for registreting on our website</h2>
    <h4>please verify your email to procced.. </h4>
    <a
    href="http://${req.headers.host}/api/admins/status/edit?email=${newAdmin.email}">click
    here</a>`
        }
        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error)
            }
            else {
                console.log('verification email sent to your gmail account ')
            }
        })

        /*  ------------------ */

        return res.status(201).send({ success: true, message: "Account created successfully", admin: createdAdmin })
    } catch (err) {
        console.log(err)
        res.status(404).send({ success: false, message: err })
    }
});



module.exports = router;