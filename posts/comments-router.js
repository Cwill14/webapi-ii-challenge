const router = require('express').Router();

const Data = require('../data/db.js');

router.get('/', (req, res) => {
    const { id } = req.params;

    if (id) {
        Data.findPostComments(id)
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(error => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})

router.post('/', (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (id) {
        if (body.text) {
            Data.insertComment(body)
                .then(comment => {
                    res.status(201).json(comment)
                })
                .catch(error => {
                    res.status(500).json({ error: "There was an error while saving the comment to the database" })
                })
        } else {
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        }
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})

module.exports = router;
