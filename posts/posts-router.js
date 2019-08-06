const router = require('express').Router();

const Data = require('../data/db.js');

router.post

router.get('/', (req, res) => {
    Data.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get

router.delete

router.put


module.exports = router;