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
        const find = await mongo.SlipCode.findOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") });
        console.log(dateFormat(now, "dddd, mmmm dS, yyyy"))
        console.log('------------ at find ------------')
        if (find != null) {
            console.log('------------ at find !=null ------------')
            console.log(find)
            AddBet(bet, res, find)
        }
        else {
            console.log('------------ at creating new ------------')
            const Entry = new mongo.SlipCode({});
            Entry.save((err) => {
                if (err) {
                    console.log('-------------- error --------------')
                    console.log(err)
                    console.log('-------------- error --------------')
                    res.status(400).json({ message: "Error adding new Entry" });
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
async function AddBet(data, res, result) {
    console.log('-------------- at adding bet --------------')
    var checker = [];
    if (data.betCompany == 'nairabet') {
        const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { nairabet: data } });
        return res.status(200).json({ message: "Added!" });
    } else if (data.betCompany == 'onexbet') {
        result.onexbet.forEach((items) => checker.push(items.slipcode))
        if (checker.includes(data.slipcode)) {
            return res.status(500).json({ message: "Already added bet code!" });
        }
        else {
            const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { onexbet: data } });
            return res.status(200).json({ message: "Added!" });
        }
    }
    else if (data.betCompany == 'sportybet') {
        const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { sportybet: data } });
        return res.status(200).json({ message: "Added!" });
    }
    else if (data.betCompany == 'bet9ja') {
        const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { bet9ja: data } });
        return res.status(200).json({ message: "Added!" });
    }
}
module.exports = router