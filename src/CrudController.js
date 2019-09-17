const express = require('express');
const CrudMiddleware = require('./CrudMiddleware')

class CrudController {

    constructor(model, preprocessor) {
        this.model = model
        this.preprocessor = preprocessor
        this.router = express.Router();


        const middleware = [CrudMiddleware]

        if(model.crudMiddleware) {
            middleware.push(model.crudMiddleware)
        }

        this.create = this.router.post('/', middleware, async (req, res) => {
            try {
                const stock = await this.model.create(req.document)
                return res.status(201).send(stock)
            } catch(err) {
                console.log(err)
                return res.status(500).send({error:(err.message || "error")});
            }
        });
    
        this.readAll = this.router.get('/', middleware, async (req, res) => {
            try {
                var stock = await this.model.find(req.query)
                return res.send(stock)
            } catch(err) {
                console.log(err)
                return res.status(500).send({error:(err.message || "error")});
            }
        });
        
    
        this.readOne = this.router.get('/:id', middleware, async (req, res) => {
            try {
                const found = await this.model.findOne(req.query)

                if(found) {
                    return res.send(found)
                } else {
                    return res.status(404).send({error:"not found"});
                }
            } catch(err) {
                console.log(err)
                return res.status(500).send({error:(err.message || "error")});
            }
        });
    
        
        this.delete = this.router.delete('/:id', middleware, async (req, res) => {
            try {
                const result = await this.model.deleteOne(req.query)

                if(result.deletedCount > 0) {
                    return res.send()
                } else {
                    return res.status(404).send({error:"not found"});
                }

            } catch(err) {
                console.log(err)
                return res.status(500).send({error:(err.message || "error")});
            }
        });
        
    
        this.replace = this.router.put('/:id', middleware, async (req, res) => {
            try {
                const result = await this.model.replaceOne(req.query, req.document)

                if(result.nModified > 0) {
                    return res.send()
                } else {
                    return res.status(404).send({error:"not found"});
                }
            } catch(err) {
                console.log(err)
                return res.status(500).send({error:(err.message || "error")});
            }
        });
        
    
        this.update = this.router.patch('/:id', middleware, async (req, res) => {
            try {
                const result = await this.model.updateOne(req.query, req.document)

                if(result.nModified > 0) {
                    return res.send()
                } else {
                    return res.status(404).send({error:"not found"});
                }
            } catch(err) {
                console.log(err)
                return res.status(500).send({error:(err.message || "error")});
            }
        });


        this.register = (path, app) => {
            app.use(path, this.router)
            return this
        }
    }
}


module.exports = CrudController
