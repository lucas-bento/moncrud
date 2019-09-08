module.exports = (req, res, next) => {
    
    var query = req.query

    Object.keys(req.params).forEach( paramName => {
        if(paramName === 'id') {
            query._id = req.params.id
        } else {
            query[paramName] = req.params[paramName]
        }
    })

    req.query = query

    if(req.body) {
        req.document = req.body
    }

    next()
}
