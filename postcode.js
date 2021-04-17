const express = require('express');
const mongo = require('./schema');
const dateFormat = require('dateformat');
var now = new Date()
const router = express.Router();

router.post('/code', async (req, res) => {
    var betCompany = req.body.betCompany;
    var bet = {
        submitter: 'test agent',
        type: req.body.type,
        slipcode: req.body.slipcode,
        odds: req.body.odds
    };
    try {
        const find = await mongo.SlipCode.find({ date: dateFormat(now, "dddd, mmmm dS, yyyy") });
        if (find != null) {
            if (betCompany == 'nairabet') {
                const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { nairabet: bet } });
                res.statusCode;
            } else if (betCompany == 'onexbet') {
                const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { onexbet: bet } });
                res.statusCode;
            }
            else if (betCompany == 'sportybet') {
                const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { sportybet: bet } });
                res.statusCode;
            }
            else if (betCompany == 'bet9ja') {
                const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { bet9ja: bet } });
                res.statusCode;
            }
        }
        else {
            const Entry = new mongo.SlipCode({});
            Entry.save(async (err) => {
                if (err) {
                    console.log('-------------- error --------------')
                    console.log(err)
                    console.log('-------------- error --------------')
                    res.statusCode(400)
                }
                else {
                    try {
                        if (betCompany == 'nairabet') {
                            const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { nairabet: bet } });
                            res.statusCode;
                        } else if (betCompany == 'onexbet') {
                            const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { onexbet: bet } });
                            res.statusCode;
                        }
                        else if (betCompany == 'sportybet') {
                            const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { sportybet: bet } });
                            res.statusCode;
                        }
                        else if (betCompany == 'bet9ja') {
                            const add = await mongo.SlipCode.updateOne({ date: dateFormat(now, "dddd, mmmm dS, yyyy") }, { $push: { bet9ja: bet } });
                            res.statusCode;
                        }

                    } catch (error) {
                        console.log('-------------- error at saving Entry --------------')
                        console.log(error)
                        console.log('-------------- error at saving Entry --------------')
                    }
                }
            })
        }
    } catch (error) {
        console.log('-------------- error at find --------------')
        console.log(error)
        console.log('-------------- error at find --------------')
    }
})
module.exports = router