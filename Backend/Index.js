const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")
const cookieParser = require('cookie-parser');



require("./config/dbconnect")
const userRoutes = require("./routes/UserRoute")



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())



app.use("/", userRoutes);



app.listen(port, () => console.log(`Example app listening on port ${port}!`))