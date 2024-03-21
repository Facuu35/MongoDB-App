const express = require(`express`)
const cookieParser = require(`cookie-parser`)
const logger = require(`morgan`)
const cors = require(`cors`)
const { authenticate } = require(`./util`)
const session = require(`express-session`)
const passport = require('passport') // this line imports the passport package
require('./mongoose'); // Assuming mongoose setup is in this file
const store = require(`./passport`)(session)
// TODO: Here, you should require() your mongoose and passport setup files that you create

// TODO: Here, you should require() your routers so you can use() them below
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth'); // Import your auth rouTER
const tasksRouter = require('./routes/tasks'); // Import  your task router

const app = express()

// These lines are provided for you.
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
})) // CORS will allow a front end specified in the .env to have access to restricted resources.
app.use(logger(`dev`)) // This line is for having pretty logs for each request that your API receives.
app.use(express.json()) // This line says that if a request has a body, that your api should assume it's going to be json, and to store it in req.body.
app.use(express.urlencoded({ extended: false })) // This line says that if there's any URL data, that it should not use extended mode.
app.use(cookieParser()) // This line says that if there are any cookies, that your app should store them in req.cookies.
// TODO: Here is where you should use the `express-session` middleware. See instructions, Step 6.2
const sess = {
    secret: 'keyboard cat',
    cookie: {},
    name: 'it210_session',
    maxAge: 604800000,
    resave: false,
    saveUninitialized: true,
    store
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
    //sess.cookie.sameSite = 'none';
}

app.use(session(sess))  // use the session with the attributes defined above
app.use(passport.initialize())
app.use(passport.session())

// TODO: Here is where you should assign your routers to specific routes. Make sure to authenticate() the routes that need authentication.
app.use(`/api/v1/user`, authenticate, userRouter) // use this as a guide for your other routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', authenticate, tasksRouter)
module.exports = app
