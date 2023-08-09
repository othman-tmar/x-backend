const express = require('express');
const router = express.Router();
const Order=require("../models/order")

// afficher la liste des articles.
router.get('/', async (req, res, )=> {
    try {
        const orders = await Order.find({}, null, { sort: { '_id': -1 } });
                
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
// créer un nouvel article
router.post('/', async (req, res) =>  {
    
    const nouvarticle = new Order(req.body)

    try {
        await nouvarticle.save();

        res.status(200).json(nouvarticle );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


});

// chercher un article
router.get('/:orderId',async(req, res)=>{
    try {
        const art = await Order.findById(req.params.orderId);
        
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// modifier un article


router.put('/:orderId', async (req, res)=> {
   try {
    const art = await Order.findByIdAndUpdate(
        req.params.orderId,
        { $set: req.body },
      { new: true }
    );
    res.status(200).json(art);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
});
// Supprimer un article
router.delete('/:orderId', async (req, res)=> {
    const  id  = req.params.orderId;
    await Order.findByIdAndDelete(id);

    res.json({ message: "order deleted successfully." });

});
module.exports = router;
