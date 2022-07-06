const router = require('express').Router();
let Watcha = require('../models/Watcha');
const { v4: uuidv4 } = require('uuid');

router.route(`/:uid`).get((req, res) => {

});

router.route(`/`).post(async (req, res) => {
    const wid = uuidv4();
    const tag = req.body.watcha;
    const uid = req.body.uid;
    const watchas = [];

    const watchaExists = await Watcha.find({ tag })
      .then(res => {
        const resObj = { 
          bool: res.length !== 0,
          res: res[0]
        }
        return resObj;
      });
    if (watchaExists.bool) {
      const newWatchas = watchaExists.res.watchas;
      newWatchas.push(uid);
      const newUpload = { ... watchaExists.res, watchas: newWatchas }
      Watcha.findOneAndUpdate({ tag }, newUpload )
        .then(() => res.json({ wid, tag, watchas: newWatchas }))
        .catch(err => res.status(400).json(err.message)); 
    } else {
      watchas.push(uid);
      const newUpload = new Watcha({ wid, tag, watchas });
      newUpload.save()
          .then(() => res.json({ wid, tag, watchas }))
          .catch(err => res.status(400).json(err.message));      
    }

});

module.exports = router;
