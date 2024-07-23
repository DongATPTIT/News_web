import dotenv from "dotenv";
import express, { Express } from 'express';
import { myDataSource } from "./core/config/data-source.config";
import adminRouters from "./module/routers/user.route"
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes/index')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')

dotenv.config();
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
    morgan('dev'),
    cookieParser(),
    methodOverride('_method'),
    express.urlencoded({
        extended: true,
    }),
    express.json(),
    express.static(path.join(__dirname, 'public'))
)

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {

        }
    }),
)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use('/', adminRouters)
route(app)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
