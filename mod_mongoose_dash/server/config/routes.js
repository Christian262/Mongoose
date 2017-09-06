const dinosaurs = require('../controllers/dinosaurs.js');
module.exports = function(app){

    app.get('/', function(req, res){
        dinosaurs.indexFind(req,res);
    });

    // Create
    app.post('/dinosaurs', function(req, res){
        dinosaurs.create(req,res);
    });


    // New
    app.get('/dinosaurs/new', function(req,res){
        res.render('new');
    });

    // Show
    app.get('/dinosaurs/:id', function(req,res){
        dinosaurs.show(req,res);
        });

    // editFind
    app.post('/dinosaurs/:id', function(req,res){
        dinosaurs.edit(req,res);
    });

    // Edit
    app.get('/dinosaurs/edit/:id', function(req,res){
        dinosaurs.editFind(req,res);
        });

    // Delete
    app.post('/dinosaurs/delete/:id', function(req,res){
        dinosaurs.delete(req,res);
        });
}
