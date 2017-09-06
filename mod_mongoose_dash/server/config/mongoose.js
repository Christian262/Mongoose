const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const models_path = path.join(__dirname, './../models');

mongoose.connect('mongodb://localhost/mon_mongoose_dash', { useMongoClient: true });

fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf('.js') >=0 ){
        require(models_path + '/' + file);
    }
});
