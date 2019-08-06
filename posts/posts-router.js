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

router.post('/', (req, res) => {
    const postBody = req.body;
    if (postBody.title && postBody.contents) {
        Data.insert(postBody)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

router.get

router.delete

router.put


module.exports = router;