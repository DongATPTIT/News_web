import { Express } from 'express';
const auth = require('./auth');
const dashboard = require('./dashboard')
function route(app: Express) {
    app.use('/', auth)
    // app.use('/', dashboard)
}
module.exports = route;