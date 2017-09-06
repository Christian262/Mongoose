const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'./static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/basic_mongoose_app', { useMongoClient: true });

let UserSchema = new mongoose.Schema({
    name: {type:String,required:true,minlength:2},
    age: {type:Number,required:true,min:1,max:125},
    // email: {type:String,required:true}
}, {timestamps:true});

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

app.get('/', function(req, res){
    User.find({}, function(err, user){
            if(err){
                console.log("uh uh uh, you didn't say the magic word!");
            }else{
                console.log("JACKPOT!");
                console.log("POST DATA", user);
            };
        });
        res.render('index');
});

mongoose.Promise = global.Promise;
app.post('/users', function(req, res){
    console.log("POST DATA", req.body);
    var user = new User(req.body);
    user.save(function(err){
        if(err){
            console.log("uh uh uh, you didn't say the magic word!");
            res.render('index', {title:'You\'ve got errors!', errors:user.errors})
        } else {
            console.log("JACKPOT!");
            res.redirect('/users');
        }
    })
})


app.listen(8000, function(){
    console.log("Listening on port 8000");
});
