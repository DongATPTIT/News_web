import dotenv from "dotenv";
import express, { Express } from 'express';
import { myDataSource } from "./core/database/config/data-source.config";
import adminRouters from "./module/routers/admin.route"
import clientRouters from "./module/routers/client.router"

const morgan = require('morgan')
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('../src/components/routes/index')
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
    morgan('dev'),
    cookieParser(),
    express.urlencoded({
        extended: true,
    }),
    express.json(),
    express.static(path.join(__dirname, 'components', 'public')))

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            eq: (a: any, b: any) => a === b
        }
    }),
)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'components', 'resources', 'views'));
app.use('/admin', adminRouters)
app.use('/client', clientRouters)
route(app)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
