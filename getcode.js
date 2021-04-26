const express = require('express');
const mongo = require('./schema');
const dateFormat = require('dateformat');
var now = new Date();
const router = express.Router();

router.get('/code', async (req, res) => {
    try {
        const data = await mongo.SlipCode.find({ date: dateFormat(now, "dddd, mmmm dS, yyyy") });
        if (data != null) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json({ message: 'Unable to find data' });
        }

    } catch (error) {
        console.log('-------------- error at getcode--------------')
        console.log(err)
        console.log('-------------- error at getcode--------------')
        res.status(400).json({ message: 'An error has occurred at catch level' })
    }

});

router.get('/company', async (req, res) => {
    try {
        const data = await mongo.betCompany.find();
        res.status(200).json(data)
    } catch (error) {
        console.log('-------------- error at getcode--------------')
        console.log(err)
        console.log('-------------- error at getcode--------------')
        res.status(400).json({ message: 'An error has occurred at catch level' })
    }
})

module.exports = router