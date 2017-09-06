const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join(__dirname, './client/static')));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');


require('./server/config/mongoose.js');

// mongoose.model('Quotes', QuoteSchema);

const routes_setter = require('./server/config/routes.js');
routes_setter(app);



// app.get('/skip', function(req, res){
//     res.render('/quotes');
// });

app.listen(8000, function(){
    console.log("I'm listening on port 8000");
});
