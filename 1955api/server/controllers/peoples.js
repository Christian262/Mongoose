const mongoose = require('mongoose');
const People = mongoose.model('People');
mongoose.Promise = global.Promise;


module.exports = {
    everybody: function(req, res){
        People.find({}, function(err, people){
            if(err){
                console.log('Where dem people at?');
            } else{
                console.log('This is off the CHAINS!');
                res.json(people);
            }
        });
    },
    create: function(req,res) {
            var person = new People({name: req.params.name});
            person.save(function(error) {
                if (err) {
                    console.log('uh uh uh, you didn\'t say the magic word!');
                } else {
                    console.log('And in the beginning!') }
            })
            res.redirect('/')
        },
    delete: function(req, res){
        People.remove({name: req.params.name}, function(err, person){
            if(err){
                console.log('uh uh uh, you didn\'t say the magic word!');
                res.redirect('/');
            } else {
                console.log('Elimated.  With extreme prejudice.');
                res.redirect('/');
            }
        });
    },
    person: function(req,res){
        People.findOne({name:req.params.name}, function(err, person){
            if(err){
                console.log('He went MIA.');
            }else{
                // console.log('Lost and now found.');
            }
            res.json(person);
        });
    }
}
