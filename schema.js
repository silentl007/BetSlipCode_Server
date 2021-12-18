const mongoose = require('mongoose');
const dateFormat = require('dateformat');
var now = new Date()

/**  
 * The schema that is inserted into the slipcodedbs on Mongo
 * if a new bet company is to be added, add its constructor here then proceed to postcode.js*/
const Bet = mongoose.Schema({
    date: {
        type: String,
        default: dateFormat(now, "dddd, mmmm dS, yyyy"),
    },
    NairaBet: {
        type: Array,
        default: [],
    },
    OnexBet: {
        type: Array,
        default: [],
    },
    SportyBet: {
        type: Array,
        default: [],
    },
    Bet9ja: {
        type: Array,
        default: [],
    },
    MerryBet: {
        type: Array,
        default: [],
    },
});

const BetComp = mongoose.Schema({
    company: {
        type: Array,
    }
});

module.exports.SlipCode = mongoose.model('SlipCodeDB', Bet);
module.exports.betCompany = mongoose.model('betcompanies', BetComp);