const router = require('express').Router();

const Data = require('../data/db.js');

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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    // const id = req.params.id;

    if (id) {
        Data.findById(id)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(error => {
                res.status(500).json({ error: "The post information could not be retrieved." })
            })
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log(res.body);
    // const postDeleted = req.body
    if (id) {
        Data.remove(id)
            .then(post => {
                // Data.findById(id)
                res.status(200).json({ message: "successfully deleted", "post deleted":  post })
            })
            .catch(error => {
                res.status(500).json({ error: "The post could not be removed" })
            })
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }

})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if (id) {
        if (changes.title && changes.contents) {
            Data.update(id, changes)
                .then(updated => {
                    res.status(200).json(updated)
                })
                .catch(error => {
                    res.status(500).json({ error: "The post information could not be modified." })
                })
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})


module.exports = router;