const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const bodyParser = require("body-parser");

const {RouterConfig} = require("./routes/index")


const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connection successfully!! ✌")
})
.catch((err)=>{
    console.log(err)
    console.log("No connection 🥵")
})

const port = process.env.PORT || 4000;

RouterConfig(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
