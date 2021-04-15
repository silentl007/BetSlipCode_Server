const mongoose = require('mongoose');
const dateFormat = require('dateformat');
var now = new Date()

const Bet = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    nairabet = [],
    x1bet = [],
    sportybet = [],
    bet9ja = [],
});

module.exports.BetSchema = mongoose.model('betslipcode', bet);