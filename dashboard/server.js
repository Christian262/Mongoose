const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'./static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// app.set('port', process.env.PORT || 8000);

mongoose.connect('mongodb://localhost/dashboard', { useMongoClient: true });

let DinosaurSchema = new mongoose.Schema({
    name: {type:String,required:true, minlength:2},
    cool: {type:String,required:true,minlength:10},
    pet: {type:String,required:true,minlength:30}
}, {timestamps:true});

mongoose.model('Dinosaurs', DinosaurSchema);
var Dinosaurs = mongoose.model('Dinosaurs', DinosaurSchema);

app.get('/', function(req, res){
    Dinosaurs.find({}, function(err, results){
        if (err) {
            console.log(err);
        }
        res.render('index', { dinosaurs: results });
    });
});

// Create
mongoose.Promise = global.Promise;
app.post('/', function(req, res){
    console.log("POST DATA", req.body);
    Dinosaurs.create(req.body, function(err, result){
        if(err){
            console.log("uh uh uh, you didn't say the magic word!");
        }else{
            console.log("JACKPOT!");
            res.redirect('/');
        }
    });
});


// New
app.get('/new', function(req,res){
    res.render('new');
});

// Show
app.get('/:id', function(req,res){
    Dinosaurs.find({ _id:req.params.id }, function(err, response){
        if (id.match(/^[0-9a-fA-F]{24}$/)){
            if(err){
                console.log(err);
            }else {
                res.render('show', {dinosaurs: response[0]});
            }
        }
    });
});

app.get('/:id/edit/', function(req,res){
    Dinosaurs.find({ _id:req.params.id }, function(err, response){
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            if(err){
                console.log(err);
            }else {
                res.render('edit', {dinosaurs: response[0]});
            }
        }
    });
});

// Edit
app.post('/:id', function(req,res){
    Dinosaurs.update({ _id:req.params.id }, function(err, response){
        if (id.match(/^[0-9a-fA-F]{24}$/)){
            if(err){
                console.log(err);
            }else {
                res.redirect('/');
            }
        }
    });
});

// Delete
app.post('/:id/delete', function(req,res){
    Dinosaurs.remove({ _id:req.params.id }, function(err, response){
        if (id.match(/^[0-9a-fA-F]{24}$/)){
            if(err){
                console.log(err);
            }else {
                res.redirect('/');
            }
        }
    });
});

app.listen(8000, function(){
    console.log("I'm listening on port 8000");
});
