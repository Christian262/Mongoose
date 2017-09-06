const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'./client/static')));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8000);

// mongoose.connect('mongodb://localhost/dashboard', { useMongoClient: true });
// mongoose.Promise = global.Promise;

require('./server/config/mongoose.js');

// mongoose.model('Dinosaurs', DinosaurSchema);


const routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000, function(){
    console.log("I'm listening on port 8000");
});
