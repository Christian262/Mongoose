const mongoose = require('mongoose');
const Quotes = mongoose.model('Quotes');
module.exports = {
    show: function(req, res){
        Quotes.find({}, function (err, quotes){
            if(err){
                console.log(err);
            }else{
                res.render('quotes', {quotes: quotes});
            }
        });
    },
    create: function(req,res){
        var quotes = new Quotes(req.body);
        quotes.save(function(err){
            if(err){
                console.log("uh uh uh, you didn't say the magic word!");
                res.render('index', {title: "You've got errors!", errors: quotes.errors});
            }else{
                console.log("JACKPOT!");
                res.redirect('/quotes');
            }
        });
    }
}
