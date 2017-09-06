// const mongoose = require('mongoose');
// const Quotes = mongoose.model('Quotes');
const quotes = require('../controllers/quotes.js');
module.exports = function(app){

    app.get('/', function(req, res){
        res.render('index');
    });

    // mongoose.Promise = global.Promise;
    app.post('/quotes', function(req, res){
        // console.log("POST DATA", req.body);
        quotes.create(req,res);
    });

    app.get('/quotes', function(req, res){
        quotes.show(req,res);
    });
}
