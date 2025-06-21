const os = require('os')

function info(req, res, next){
    res.json({
        hostname: os.hostname()
    })
}

module.exports = { info }