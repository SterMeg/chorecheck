const express = require('express')
const Router = express.Router
const router = Router()
const User = require('../models/User')

router.get('/', async (req, res, next) => {
    try {
        const docs = await User.find()
        res.status(200).send({
            data: docs
        })
    } catch(e) {
        next(e)
    }
})

router.route('/:id')
    .get(async (req, res, next) => {
    const userId = req.params.user_id
    try {
        const doc = await User.findById(userId)
        res.status(200).send({
            data: [doc]
        })
    } catch(e) {
        next(e)
    }
    })
    .delete(async (req, res, next) => {
        const { id } = req.params

        try {
            const doc = await User.findByIdAndRemove({ _id: id })
            res.status(202).send({ data: [doc] })
        } catch(e) {
            next(e)
        }
    })

router.post('/', async (req, res, next) => {
    const name = req.body.user
    
    const user = new User({name})
    try {
        const doc = await user.save()

        res.status(201).send({
            data: [doc]
        })
    } catch(e) {
        next(e)
    }
})

module.exports = router


