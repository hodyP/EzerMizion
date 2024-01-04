require('dotenv').config()
const express=require('express')
const app=express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3600
var bodyParser = require('body-parser')
console.log(process.env.NODE_ENV)

//middleware
app.use(cors(corsOptions))
app.use(cors());
app.use(bodyParser.urlencoded())
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(cookieParser())

//routes

app.use('/', require('./routes/root'));
app.use("/api/volunteer", require("./routes/volunteerRoutes"));
app.use("/api/volunteer_timer", require("./routes/volunteer_timerRoutes"));
app.use("/api/needy", require("./routes/needyRoutes"));
app.use("/api/part_in_day",require("./routes/partInDayRouters"));
app.use("/api/needy_request", require("./routes/needy_requestRoutes"));
app.use('/api/manager',require("./routes/managerRouters"));
app.use('/api/type_of_volunteer',require("./routes/type_of_volunteer"));
app.use("/api/city",require("./routes/cityRouters"));
app.use("/api/volunteer_details",require("./routes/volunteer_detailsRoutes"));
//to do: convert to middleware
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))