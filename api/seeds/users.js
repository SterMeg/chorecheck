const User = require('../models/User')

const users = []

const meghan = new User({
    name: 'Meghan'
})

users.push(meghan)

const jamie = new User({
    name: 'Jamie'
})

users.push(jamie)

module.exports = users