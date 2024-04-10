const express = require('express')
const appRoutes = require('./routes')
const bodyParser = require('body-parser')

const PORT = 8087

const app = express();
app.use(bodyParser.json())
app.use("/", appRoutes);

app.listen(PORT,function(){
    console.log('started')
})