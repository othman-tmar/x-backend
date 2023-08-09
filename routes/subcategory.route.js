const express = require('express');
const router = express.Router();
const Subcategory=require("../models/subcategory")
const { verifyToken } = require('../middleware/verifyToken');
const { authorizeRoles } = require('../middleware/authorizeRoles');

// afficher la liste des articles.
router.get('/', async (req, res, )=> {
    try {
        const subcategories = await Subcategory.find({}, null, { sort: { '_id': -1 } });
                
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
// créer un nouvel article
router.post('/', async (req, res) =>  {
    
    const nouvarticle = new Subcategory(req.body)

    try {
        await nouvarticle.save();

        res.status(200).json(nouvarticle );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


});

// chercher un article
router.get('/:subcategoryId',async(req, res)=>{
    try {
        const art = await Subcategory.findById(req.params.subcategoryId);
        
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// modifier un article


router.put('/:subcategoryId',verifyToken,authorizeRoles("admin"), async (req, res)=> {
   try {
    const art = await Subcategory.findByIdAndUpdate(
        req.params.subcategoryId,
        { $set: req.body },
      { new: true }
    );
    res.status(200).json(art);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
});
// Supprimer un article
router.delete('/:subcategoryId',verifyToken,authorizeRoles("admin"), async (req, res)=> {
    const  id  = req.params.subcategoryId;
    await Subcategory.findByIdAndDelete(id);

    res.json({ message: "Subcategory deleted successfully." });

});
module.exports = router;