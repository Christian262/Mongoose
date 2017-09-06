const mongoose = require('mongoose');

let QuoteSchema = new mongoose.Schema({
    name: {type:String, required:[true, 'Name required, at least 2 characters'], minlength:2},
    quote: {type:String, required:[true, 'Quote required, between 5 and 500 characters'], minlength:5, maxlength:500},
    createdAt: {type:Date}
}, {timestamps:true});

var Quotes = mongoose.model('Quotes', QuoteSchema);
