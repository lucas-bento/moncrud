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
                return res.status(500).send({error:"error"});
            }
        });
        
    
        this.readAll = this.router.get('/', middleware, async (req, res) => {
            try {
                var stock = await this.model.find(req.query)
                return res.send(stock)
            } catch(err) {
                console.log(err)
                return res.status(500).send({error:"error"});
            }
        });
        
    
        this.readOne = this.router.get('/:id', middleware, async (req, res) => {
            try {
                const found = await this.model.findOne(req.query)
                return res.send(found)
            } catch(err) {
                console.log(err)
                return res.status(500).send({error:"error"});
            }
        });
    
        
        this.delete = this.router.delete('/:id', middleware, async (req, res) => {
            try {
                await this.model.deleteOne(req.query)
                return res.send()
            } catch(err) {
                console.log(err)
                return res.status(500).send({error:"error"});
            }
        });
        
    
        this.replace = this.router.put('/:id', middleware, async (req, res) => {
            try {
                await this.model.replaceOne(req.query, req.document)
                return res.send()
            } catch(err) {
                console.log(err)
                return res.status(500).send({error:"error"});
            }
        });
        
    
        this.update = this.router.patch('/:id', middleware, async (req, res) => {
            try {
                await this.model.updateOne(req.query, req.document)
                return res.send()
            } catch(err) {
                console.log(err)
                return res.status(500).send({error:"error"});
            }
        });


        this.register = (path, app) => {
            app.use(path, this.router)
            return this
        }
    }
}


module.exports = CrudController
