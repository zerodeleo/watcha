const router = require('express').Router();
let Watcha = require('../models/Watcha');
const { v4: uuidv4 } = require('uuid');

const configureTag = (tag) => {
  let tagLowerCase = tag.toLowerCase();
  if (/s$/.test(tagLowerCase)) {
    tagLowerCase = tagLowerCase.replace(/s$/, '');
  }
  return tagLowerCase;
}

router.route(`/messages`).get((req, res) => {
  const tag = req.query.tag;
  Watcha.find({ tag })
    .then(data => res.json(data[0].messages))
    .catch(err => res.status(400).json(err.message))
});

router.route(`/:tag`).post((req, res) => {
  const msg = req.body.msg;
  const { username, uid } = req.body.auth;
  const { wid, messages, watchas, tag } = req.body.watcha;
  const createdAt = new Date();
  const newChat = { uid, username, createdAt, msg }
  const newUpload = { wid, watchas, tag, messages: [ ...messages, newChat]}
    Watcha.findOneAndUpdate({ tag }, newUpload)
      .then(() => res.json(res.data))
      .catch(err => res.status(400).json(err.message));     
});

router.route(`/`).post(async (req, res) => {
    const wid = uuidv4();
    const tag = configureTag(req.body.watcha);
    const uid = req.body.uid;
    const watchas = [];
    const messages = [];

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
        .then(() => res.json({ wid, tag, watchas: newWatchas, messages }))
        .catch(err => res.status(400).json(err.message)); 
    } else {
      watchas.push(uid);
      const newUpload = new Watcha({ wid, tag, watchas, messages });
      newUpload.save()
          .then(() => res.json({ wid, tag, watchas }))
          .catch(err => res.status(400).json(err.message));      
    }

});

module.exports = router;
