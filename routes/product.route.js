const express = require('express');
const router = express.Router();
const Product=require("../models/product")
const { verifyToken } = require('../middleware/verifyToken');
const { authorizeRoles } = require('../middleware/authorizeRoles');

// afficher la liste des articles.
router.get('/',async (req, res, )=> {
    try {
        const products = await Product.find({}, null, { sort: { '_id': -1 } });
                
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
// créer un nouvel article
router.post('/',verifyToken ,async (req, res) =>  {
    
    const nouvarticle = new Product(req.body)

    try {
        console.log(req.body);
        await nouvarticle.save();

        res.status(200).json(nouvarticle );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


});

// chercher un article
router.get('/:productId',async(req, res)=>{
    try {
        const art = await Product.findById(req.params.productId);
        
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// modifier un article


router.put('/:productId', async (req, res)=> {
   try {
    const art = await Product.findByIdAndUpdate(
        req.params.productId,
        { $set: req.body },
      { new: true }
    );
    res.status(200).json(art);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
});

// Supprimer un article
router.delete('/:productId',verifyToken,authorizeRoles("admin"), async (req, res)=> {
    const  id  = req.params.productId;
    await Product.findByIdAndDelete(id);

    res.json({ message: "product deleted successfully." });

});
module.exports = router;
