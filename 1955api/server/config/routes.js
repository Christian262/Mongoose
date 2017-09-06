const people = require('../controllers/peoples.js');
const mongoose = require('mongoose');
module.exports = function(app){

    app.get('/', function(req, res){
        people.everybody(req,res);
    });

    app.get('new/:name', function(req,res){
        people.create(req,res);
    });

    app.get('/remove/:name', function(req, res){
        people.delete(req,res);
    });

    app.get('/:name', function(req,res){
        people.person(req,res);
    });
}
