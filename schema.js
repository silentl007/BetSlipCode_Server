const mongoose = require('mongoose');
const dateFormat = require('dateformat');
var now = new Date()

const Bet = mongoose.Schema({
    date: {
        type: String,
        default: dateFormat(now, "dddd, mmmm dS, yyyy"),
    },
    nairabet : {
        type: Array,
        default: [],
    },
    onexbet : {
        type: Array,
        default: [],
    },
    sportybet : {
        type: Array,
        default: [],
    },
    bet9ja : {
        type: Array,
        default: [],
    },
});

module.exports.SlipCode = mongoose.model('SlipCodeDB', Bet);