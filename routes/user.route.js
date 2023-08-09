const express = require('express');
const router = express.Router();
const User=require("../models/user")
const { verifyToken } = require('../middleware/verifyToken');
const { authorizeRoles } = require('../middleware/authorizeRoles');
// afficher la liste des articles.
router.get('/', async (req, res, )=> {
    try {
        const users = await User.find({}, null, { sort: { '_id': -1 } });
                
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
// créer un nouvel article
router.post('/', async (req, res) =>  {
    
    const nouvarticle = new User(req.body)

    try {
        await nouvarticle.save();

        res.status(200).json(nouvarticle );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


});

// chercher un article
router.get('/:userId',async(req, res)=>{
    try {
        const art = await User.findById(req.params.userId);
        
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// modifier un article


router.put('/:userId', async (req, res)=> {
   try {
    const art = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: req.body },
      { new: true }
    );
    res.status(200).json(art);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
});
// Supprimer un article
router.delete('/:userId',verifyToken,authorizeRoles("admin"), async (req, res)=> {
    const  id  = req.params.userId;
    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully." });

});
module.exports = router;