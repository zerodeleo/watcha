const router = require('express').Router();
let User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

const throwErr = (message) => {
    throw new Error(message);
};

router.route(`/:uid`).get((req, res) => {
    console.log(req.url)
    const uid = req.params.uid;
    User.find({ uid })
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err.message));
});

router.route(`/`).post(async (req, res) => {
    const uid = uuidv4();
    const username = req.body.username;
    
    const userExists = await User.find({ username })
        .then(res => res.length === 0);
    
    if (!userExists) {
        res.status(409).json(`${username} already exists`);
    } else {
        const newUpload = new User({ uid, username });
        newUpload.save()
            .then(() => res.json(newUpload))
            .catch(err => res.status(400).json(err.message));
    }
});

module.exports = router;
