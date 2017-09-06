
module.exports = function(app, passport){

    //home page
    app.get('/', function(req,res){
        res.render('index');
    });

    //login
    app.get('/login', function(req,res){
            res.render('login', {message: req.flash('loginMessage')});
    });

    // signup
    app.get('/signup', function(req,res){
        res.render{'signup', message: req.flash('signupMessage')});
    });

    
}
