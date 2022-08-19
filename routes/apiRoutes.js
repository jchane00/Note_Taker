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

router.post('/notes',(req, res)=> {
    const newEntry = {
        ...req.body,
        id:uuid()
    }
    fs.readFile(path.join(__dirname, "../db/db.json"))//Reading in existing database from file
        .then((fileContent) => {
            const dbData = JSON.parse(fileContent)//turn text from the file into data
            dbData.push(newEntry) //push the body of the request as a new item in the database array
            return fs.writeFile(path.join(__dirname, "../db/db.json"),JSON.stringify(dbData))//writing changes back out to the file(db.json)
        })
        .then(()=>{
            res.json(newEntry)
        })
})
module.exports = router;
