const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'./static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/message_board', { useMongoClient: true });

const Schema = mongoose.Schema;

const MessagesSchema = new mongoose.Schema({
    name: {type:String,required:[true, 'Must contain at least 4 characters'], minlength:4},
    message: {type:String,required:[true, 'Must contain at least 20 characters'], minlength:20},
    comments: [{type:Schema.Types.ObjectId, ref:'Commments'}]
}, {timestamps:true});

const CommentsSchema = new mongoose.Schema({
    _messages: {type:Schema.Types.ObjectId, ref:'Messages'},
    name: {type:String,required:[true, 'Must contain at least 4 characters'],minlength:4},
    comment: {type:String,required:[true, 'Must contain at least 10 characters'],minlength:10}
}, {timestamp:true});

mongoose.model('Messages', MessagesSchema);
mongoose.model('Comments', CommentsSchema);

const Messages = mongoose.model('Messages');
const Comments = mongoose.model('Comments');

app.get('/', function(req, res){
     Messages.find({}, false, true).populate('_comments').exec(function(err, messages){
         res.render('index', {messages:messages});
     });
});

mongoose.Promise = global.Promise;
app.post('/messages', function(req,res){
    var newMessages = new Messages(req.body);
    newMessages.save(function(err){
        if(err){
            console.log(err);
            res.render('index', {errors: newMessages.errors});
        }else{
            console.log("JACKPOT!");
            res.redirect('/');
        }
    });
});

app.post("/comments/:id", function(req, res){
	var messages_id = req.params.id;
	Messages.findOne({_id: messages_id}, function(err, messages){
		var newComments = new Comments(req.body);
		newComments._messages = messages._id;
		Messages.update({_id: messages._id}, {$push: {"_comments": newComments}}, function(err){

		});
		newComments.save(function(err){
			if(err){
				console.log(err);
				res.render('index', {errors: newComments.errors});
			} else {
				console.log("new comment added!");
				res.redirect("/");
			}
		});
	});
});


app.listen(8000, function(){
    console.log("I'm listening on port 8000; over and out");
});
