const express = require('express')
const Router = express.Router
const router = Router()
const { List, Chore } = require('../models/List')

//GET /lists
router.get('/', async (req, res, next) => {
    try {
        const docs = await List.find().populate('user')
        res.status(200).send({
            data: docs
        })
    } catch(e) {
        next(e)
    }
})

router.post('/', async (req, res, next) => {
    const { user } = req.body

    try {
        const doc = new List({ user })
        await doc.save()
        res.status(201).send({
            data: [doc]
        })
    } catch(e) {
        next(e)
    }
})

router.route('/:id')
    .get(async (req, res, next) => {
        const { id } = req.params

        try {
            const doc = await List.findById(id)
            res.status(200).send({
                data: [doc]
            })
        } catch(e) {
            next(e)
        }
    }) 
    .post(async (req, res, next) => {
        const { id } = req.params
        const { chore, day } = req.body
        
        try {
            const doc = await List.findByIdAndUpdate({ _id: id }, {$push: {chores: {
                chore: chore, day: day
            }}})
            res.status(201).send({
                data: [doc]
            })
        } catch(e) {
            console.log(e)
        }
    })

router.delete('/:id', async (req, res, next) => {
    const { id }  = req.params
    
    try {
        const doc = await List.findByIdAndRemove({ _id: id })
        res.status(202).send({ data: [doc] })
    } catch(e) {
        next(e)
    }
})

module.exports = router