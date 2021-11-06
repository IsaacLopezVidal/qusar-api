const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
var logger = morgan('combined', { stream: accessLogStream })
exports.logger=logger;
