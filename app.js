const express = require("express")
const morgan = require("morgan")
const apps = require('./playstore')
const  app = express()

app.use(morgan('common'))

app.get("/apps", (req, res)=>{
    let result = []
    let {sort, genres} = req.query
    
   if (genres){
       
    if ( !['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
        res.status(400).send("Send the correct genre you absolute fat fuck !")
    }  
    result =  apps.filter(current => {
        return current.Genres === genres
    })}
    

    if (sort){
        if (!['Rating', 'App'].includes(sort)){
            res.status(400).send("OH MY GOD WHAT THE FUCK DID I JUST SAY YOU CAN'T DO ANYTHING RIGHT YOU ABSOLUTE GARBAGE CAN'S ASS")
        }
        result = apps.sort((a,b)=>{
            return a[sort] > b[sort] ? 1 : -1
        })
    }
    return res.json(apps)

})


module.exports = app