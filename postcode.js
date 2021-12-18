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
        odds: req.body.odds,
        sport: req.body.sport,
        start: req.body.start,
    };
    try {
        const find = await mongo.SlipCode.findOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") });
        if (find != null) {
            AddBet(bet, res)
        }
        else {
            const Entry = new mongo.SlipCode({});
            Entry.save((err) => {
                if (err) {
                    console.log('-------------- error --------------')
                    console.log(err)
                    console.log('-------------- error --------------')
                    res.status(400).json({ message: "Error adding new Entry" });
                }
                else {
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
    var checker = [];
    const result = await mongo.SlipCode.findOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") });
    if (data.betCompany == 'NairaBet') {
        result.NairaBet.forEach((items) => checker.push(items.slipcode))
        if (checker.includes(data.slipcode)) {
            return res.status(500).json({ message: "Already added bet code!" });
        }
        else {
            const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { NairaBet: data } });
            return res.status(200).json({ message: "Added!" });
        }
    } else if (data.betCompany == 'OnexBet') {
        result.OnexBet.forEach((items) => checker.push(items.slipcode))
        if (checker.includes(data.slipcode)) {
            return res.status(500).json({ message: "Already added bet code!" });
        }
        else {
            const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { OnexBet: data } });
            return res.status(200).json({ message: "Added!" });
        }
    }
    else if (data.betCompany == 'SportyBet') {
        result.SportyBet.forEach((items) => checker.push(items.slipcode))
        if (checker.includes(data.slipcode)) {
            return res.status(500).json({ message: "Already added bet code!" });
        }
        else {
            const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { SportyBet: data } });
            return res.status(200).json({ message: "Added!" });
        }
    }
    else if (data.betCompany == 'Bet9ja') {
        result.Bet9ja.forEach((items) => checker.push(items.slipcode))
        if (checker.includes(data.slipcode)) {
            return res.status(500).json({ message: "Already added bet code!" });
        }
        else {
            const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { Bet9ja: data } });
            return res.status(200).json({ message: "Added!" });
        }

    } else if (data.betCompany == 'MerryBet') {
        result.MerryBet.forEach((items) => checker.push(items.slipcode))
        if (checker.includes(data.slipcode)) {
            return res.status(500).json({ message: "Already added bet code!" });
        }
        else {
            const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { MerryBet: data } });
            return res.status(200).json({ message: "Added!" });
        }

    }
}
module.exports = router