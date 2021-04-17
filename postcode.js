const express = require('express');
const mongo = require('./schema');
const dateFormat = require('dateformat');
var now = new Date()
const router = express.Router();

router.post('/code', async (req, res) => {
    console.log('-------------- at post route --------------')
    var bet = {
        betCompany: req.body.betCompany,
        submitter: 'test agent',
        type: req.body.type,
        slipcode: req.body.slipcode,
        odds: req.body.odds
    };
    try {
        const find = await mongo.SlipCode.find({ date: dateFormat(now, "dddd, mmmm dS, yyyy") });
        console.log('------------ at find ------------')
        if (find != null) {
            AddBet(bet, res)
        }
        else {
            console.log('------------ at creating new ------------')
            const Entry = new mongo.SlipCode({});
            Entry.save((err) => {
                if (err) {
                    console.log('-------------- error --------------')
                    console.log(err)
                    console.log('-------------- error --------------')
                    res.status(400)
                }
                else {
                    console.log('------------ finished creating new ------------')
                    AddBet(bet, res)
                }
            })
        }
    } catch (error) {
        console.log('-------------- error at create --------------')
        console.log(error)
        console.log('-------------- error at create --------------')
    }
})
async function AddBet(data, res) {
    console.log('-------------- at adding bet --------------')
    if (data.betCompany == 'nairabet') {
        const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { nairabet: data } });
        res.status(200);
    } else if (data.betCompany == 'onexbet') {
        const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { onexbet: data } });
        res.status(200);
    }
    else if (data.betCompany == 'sportybet') {
        const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { sportybet: data } });
        res.status(200);
    }
    else if (data.betCompany == 'bet9ja') {
        const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { bet9ja: data } });
        res.status(200);
    }
}
module.exports = router