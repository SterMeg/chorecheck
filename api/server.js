'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/lists', require('./routes/lists'));
app.use('/users', require('./routes/users'))

app.use('/', express.static(
  path.join(__dirname, '../build')
))

//If the user visits a URL that we do not have a defined route path for, 
//send them to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(path.join(__dirname, '../build/index.html')))
})


app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const errors = [
      { message: 'unauthorized' },
    ];

    res.status(401).json({ errors });
  }
});

module.exports = app;
