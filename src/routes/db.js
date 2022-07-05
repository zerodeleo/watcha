const router = require('express').Router();
let Db = require('../models/Db');

router.route('/:uid').get((req, res) => {
    const uid = req.params.uid;
    Db.find({ uid })
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:uid').post((req, res) => {
    const uid = req.params.uid;
    const document = req.body.document;

    const newUpload = new Db({ uid, document });

    newUpload.save()
        .then(() => res.json(newUpload))
        .catch(err => res.status(400).json('Error: ' + err))
    
})

module.exports = router;
