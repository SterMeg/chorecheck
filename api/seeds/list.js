const { List, Chore } = require('../models/List')

const users = require('./users')

const lists = []
// const chores = []

const choreOne = new Chore({
    chore: 'Make bed',
    day: 'Monday'
})


const choreTwo = new Chore({
    chore: 'Feed pugs',
    day: 'Tuesday'
})


const list = new List({
    user: users[0]
})

list.chores.push(choreOne, choreTwo)

module.exports = list