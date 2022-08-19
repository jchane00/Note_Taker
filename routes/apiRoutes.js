const router = require('express').Router();
const fs = require('fs').promises;
const path =require('path')
const {v4: uuid} = require("uuid");

router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"))
        .then((fileContent) => {
            res.json(JSON.parse(fileContent))
        })
})

