import { Express } from 'express';
const auth = require('./auth')

function route(app: Express){
    app.use('/',auth)
}
module.exports= route;