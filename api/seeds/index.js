const mongoose = require('mongoose')

const User = require('../models/User')
const { List } = require('../models/List')
const users = require('./users')
const list = require('./list')
const uri = 'mongodb://localhost:27017/chores'

const truncateDatabase = async() => {
    return Promise.all([User.deleteMany(), List.deleteMany()])
}

const makeSeeds = async () => {
    await mongoose.connect(uri)
    await truncateDatabase()
    // await Promise.all(users.map(user => user.save()))
    // await list.save()
    mongoose.connection.close()
} 

makeSeeds()