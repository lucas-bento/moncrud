module.exports = (req, res, next) => {
    var query = {}

    if (req.params.id) {
        query._id = req.params.id
    }

    req.query = query

    if(req.body) {
        req.document = req.body
    }

    next()
}
