const router = require('express').Router();
let User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

router.route(`/`).get(async(req, res) => {
    const uids = req.query.watchas;
    const promises = await uids.map(async uid => {
        const user = await User.find({ uid })
            .then(data => data)
            .catch(err => res.status(400).json(err.message))
        return { uid: user[0].uid, username: user[0].username };
    })
    
    Promise.all(promises)
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err.message));
});
router.route(`/:uid`).get((req, res) => {
    const uid = req.params.uid;
    console.log(uid)
    User.find({ uid })
        .then(data => res.json({ uid: data[0].uid, username: data[0].username }))
        .catch(err => res.status(400).json(err.message));
});

router.route(`/`).post((req, res) => {
    const uid = uuidv4();
    const username = req.body.username.toLowerCase();

    const newUpload = new User({ uid, username });
        newUpload.save()
            .then(() => res.json({ uid, username }))
            .catch(err => res.status(400).json(err.message));
});

module.exports = router;
