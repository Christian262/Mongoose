const mongoose = require('mongoose');

let PeopleSchema = new mongoose.Schema({
    name: {type:String, required:[true, 'Must add name!'], unique:true},

}, {timestamps: true});

var People = mongoose.model('People', PeopleSchema);
