const express = require('express');
const router = express.Router();
const Category=require("../models/category")
const { verifyToken } = require('../middleware/verifyToken');
const { authorizeRoles } = require('../middleware/authorizeRoles');

// afficher la liste des articles.
router.get('/', async (req, res, )=> {
    try {
        const categories = await Category.find({}, null, { sort: { '_id': -1 } });
                
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
// créer un nouvel article
router.post('/'  ,verifyToken, async (req, res) =>  {
    
    const nouvarticle = new Category(req.body)

    try {
        await nouvarticle.save();

        res.status(200).json(nouvarticle );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


});

// chercher un article
router.get('/:categoryId',async(req, res)=>{
    try {
        const art = await Category.findById(req.params.categoryId);
        
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// modifier un article


router.put('/:categoryId',verifyToken,authorizeRoles("admin"), async (req, res)=> {
   try {
    const art = await Category.findByIdAndUpdate(
        req.params.categoryId,
        { $set: req.body },
      { new: true }
    );
    res.status(200).json(art);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
});
// Supprimer un article
router.delete('/:categoryId',verifyToken,authorizeRoles("admin"), async (req, res)=> {
    const  id  = req.params.categoryId;
    await Category.findByIdAndDelete(id);

    res.json({ message: "Category deleted successfully." });

});
module.exports = router;