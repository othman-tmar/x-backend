const express = require('express');
const router = express.Router();
const Cartitem=require("../models/cartitem")

// afficher la liste des articles.
router.get('/', async (req, res, )=> {
    try {
        const cartitems = await Cartitem.find({}, null, { sort: { '_id': -1 } });
                
        res.status(200).json(cartitems);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
// créer un nouvel article
router.post('/', async (req, res) =>  {
    
    const nouvarticle = new Cartitem(req.body)

    try {
        await nouvarticle.save();

        res.status(200).json(nouvarticle );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


});

// chercher un article
router.get('/:cartitemId',async(req, res)=>{
    try {
        const art = await Cartitem.findById(req.params.cartitemId);
        
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// modifier un article


router.put('/:cartitemId', async (req, res)=> {
   try {
    const art = await Cartitem.findByIdAndUpdate(
        req.params.cartitemId,
        { $set: req.body },
      { new: true }
    );
    res.status(200).json(art);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
});
// Supprimer un article
router.delete('/:cartitemId', async (req, res)=> {
    const  id  = req.params.cartitemId;
    await Cartitem.findByIdAndDelete(id);

    res.json({ message: "Cartitem deleted successfully." });

});
module.exports = router;