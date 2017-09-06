const mongoose = require('mongoose');
const Dinosaurs = mongoose.model('Dinosaurs');
mongoose.Promise = global.Promise;

module.exports = {
    indexFind: function(req,res){
        Dinosaurs.find({}, function(err, results){
            if (err) {
                console.log('No bueono', err);
            }
            res.render('index', { dinosaurs: results });
        });
    },
    create: function(req,res){
        let dinosaurs = new Dinosaurs(req.body);
        dinosaurs.save(function(err){
            if(err){
                console.log("uh uh uh, you didn't say the magic word!");
            }else{
                console.log("POST DATA", req.body);
                console.log("JACKPOT!");
                res.redirect('/');
            }
        });
    },
    show: function(req,res){
        Dinosaurs.find({ _id:req.params.id }, function(err, response){
                if(err){
                    console.log(err);
                }else {
                    res.render('show', {dinosaurs: response[0]});
                }
            });
    },
    editFind: function(req,res){
        Dinosaurs.find({ _id:req.params.id }, function(err, response){
                if(err){
                    console.log(err);
                }else {
                    res.render('edit', {dinosaurs: response[0]});
                }
            });
    },
    edit: function(req,res){
        Dinosaurs.update({ _id:req.params.id }, req.body, function(err, response){
                    if(err){
                    console.log(err);
                }else {
                    res.redirect('/');
                }
            });
    },
    delete: function(req,res){
        Dinosaurs.remove({ _id:req.params.id }, function(err, response){
                if(err){
                    console.log(err);
                }else {
                    res.redirect('/');
                }
            });
    },
}
