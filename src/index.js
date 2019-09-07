const Crud = require('./CrudController')
const express = require('express');
const bodyParser = require('body-parser'); 

module.exports = crudify


registerCrud = (app, model, route) => {
    const actualRoute = `${app.crudPrefix}${route}`
    console.log(`Creating crud with route: ${actualRoute}`)

    return new Crud(model).register( actualRoute, app)
}


function crudify(app = express()) {
    console.log('crudifying...')

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}))

    app.cruds = []
    app.crudPrefix = '/'

    app.addCrud = (model, route) => {
        if(!route) {
            route = model.modelName.toLowerCase()
        }

        app.cruds.push(
            registerCrud(app, model, route)
        )
    }

    app.addCruds = (models) => {
        models.forEach(model => {
            registerCrud(app, model, model.modelName)
        });
    }

    console.log('crudifyed!')
    return app
}