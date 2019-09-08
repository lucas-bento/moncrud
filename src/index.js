import Crud from './CrudController';
import express from 'express';
import { json, urlencoded } from 'body-parser'; 

export default crudify


registerCrud = (app, model, route) => {
    const actualRoute = `${app.crudPrefix}${route}`
    console.log(`Creating crud with route: ${actualRoute}`)

    return new Crud(model).register( actualRoute, app)
}


function crudify(app = express()) {
    console.log('crudifying...')

    app.use(json())
    app.use(urlencoded({extended: false}))

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
            registerCrud(app, model, model.modelName.toLowerCase())
        });
    }

    console.log('crudifyed!')
    return app
}