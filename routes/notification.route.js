const express = require('express');
const router = express.Router();
const Notification=require("../models/notification")


router.get('/', async (req, res, )=> {
    try {
        const notifications = await Notification.find();
                
        res.status(200).json(notifications);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});


router.post('/', async (req, res) =>  {
    
    const x = new Notification(req.body)

    try {
        await x.save();

        res.status(200).json(x);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


});


router.get('/:notificationId',async(req, res)=>{
    try {
        const art = await Notification.findById(req.params.notificationId);
        
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});



router.put('/:notificationId', async (req, res)=> {
   try {
    const art = await Notification.findByIdAndUpdate(
        req.params.notificationId,
        { $set: req.body },
      { new: true }
    );
    res.status(200).json(art);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
});


router.delete('/:notificationId', async (req, res)=> {
    const  id  = req.params.notificationId;
    await Notification.findByIdAndDelete(id);

    res.json({ message: "notification deleted successfully." });

});
module.exports = router;
