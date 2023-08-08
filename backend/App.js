const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');

const CONNECTION_URI = "mongodb+srv://mrunal21:mrunal21@cluster0.eugjmpy.mongodb.net/violatedData";

mongoose.connect(CONNECTION_URI)
    .then(() => {
        console.log('----------------- connection sucess -----------------');
    })
    .catch((e) => {
        console.log(`----------------- connection error ${e} -----------------`);
    });

app.listen(5000, () => {
    console.log('Running on server 5000')
})
app.use(cors())

const UserSchema = require('./UserSchema');
const model = mongoose.model('dataset', UserSchema)

app.get('/getdataset', (req, res) => {
    model.find()
        .then((val, err) => {
            if (err) {
                console.log(err)
                return
            }
            res.json(val)
        })
})

app.get('/getlog', (req, res) => {
    model.aggregate([{ $sample: { size: 1 } }])
    .then((randomLog, err) => {
        if(err) {
            console.log(err);
            return res.status(500).json({error:err});
        } 
        if (randomLog.length === 0) {
            return res.status(404).json({ message: 'No random document found.' });
        }
        res.json(randomLog[0]);
    })
})


