const mongoose = require('mongoose');

let DinosaurSchema = new mongoose.Schema({
    name: {type:String,required:[true, 'Must add name!'], minlength:2, unique:true},
    cool: {type:String,required:[true,'Must have at least 10 characters!'],minlength:10},
    food: {type:String,required:[true, 'Must add favorite food!'], minlength:10},
    pet: {type:String,required:[true,'You must include at least 30 characters, thanks!'],minlength:20}
}, {timestamps:true});

var Dinosaurs = mongoose.model('Dinosaurs', DinosaurSchema);
