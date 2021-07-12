
const express = require("express");
const app = express()
const port = 3000
const child = require("child_process");
const path = require("path")
const util = require("util")
const axios = require("axios")
const {PythonShell} = require('python-shell');

const exec = util.promisify(child.exec);
app.use("/public",express.static(path.join(__dirname,'public')))


app.get('/', async (req, res) => 
{
    res.sendFile(path.join(__dirname+'/index.html'));
})


app.get('/scrape' ,async (req, res) =>
{
    const { stdout, stderr } = await exec(`python ${path.join(__dirname,'/scrape.py')}`)

    if(stderr) 
    {
        return res.send({error:stderr.toString()})
    }
    
    // const awat = await JSON.parse(stdout); 
    console.log(JSON.parse(stdout))
    res.send({stdout: JSON.parse(stdout)})   // handling by script.js
})

app.listen(port, () =>
{
    console.log(`http://localhost:${port}`)
})