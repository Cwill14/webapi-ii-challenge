const router = require('express').Router();

// const commentsRouter = require('./comments-router.js');

const Data = require('../data/db.js');

// router.use('/:id/comments', commentsRouter);

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
                // res.status(201).json(post)
                res.status(201).json(postBody)
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
    // console.log(res.body);
    // // const postDeleted = req.body
    // let oldData = {};
    // Data.findById(id).then((post => (oldData = post)))

    if (id) {
        Data.remove(id)
            .then(post => {
                res.status(200).json({ message: "successfully deleted" })
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
                    // res.status(200).json(updated)
                    res.status(200).json(changes)
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

router.get('/:id/comments', (req, res) => {
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

router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (id) {
        if (body.text) {
            Data.insertComment(body)
                .then(comment => {
                    // res.status(201).json(comment)
                    res.status(201).json(body)
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