const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

const videosPath = path.join(__dirname,'../videos')
//app funtions

//SERVER

const staticPath = path.join(__dirname,"../static/")

app.use(express.static(staticPath))

// Handle requests for video names

app.get('/videos',(req,res)=>{
    fs.readdir(videosPath,(err, files)=>{
        if (err){
            return console.log("could not get files from directory")
        }
        
        let filteredFiles = files.filter(file => file.includes(req.query.name));
        //console.log(filteredFiles)
        res.send(JSON.stringify(filteredFiles))
    })
})

/// Content delivery API

app.use('/cdn/videos/', (req, res)=>{
    res.sendFile(videosPath+"/"+req.originalUrl.substr(12))
})
/// Watch Player Page

app.use('/watch', (req, res)=>{
    res.sendFile(staticPath+"/player/"+"index.html")
})


// Development Server on PORT 3000
app.listen(3000,()=>{
    console.log('listening on development port 3000')
})