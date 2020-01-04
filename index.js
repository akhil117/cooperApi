const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const form = require('./router/forms');

const cors = require('cors')

mongoose.connect('mongodb://localhost/cooper-api',{useUnifiedTopology: true,useNewUrlParser: true})
.then(() => console.log('connected  to mongodb'))
.catch(err => console.error('not able to connect '))

const app = express();
app.use(express.json());
app.use(cors({credentials: true, origin: true}))

app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
app.use('/api/form',form);




const port = process.env.PORT || 1234;
app.listen(port,() =>{console.log(`listening to the port ${port}`)})