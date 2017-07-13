const formidable = require('formidable');
const express = require('express');
const fs = require('fs');
const path = require('path');
const Busboy = require('connect-busboy');
const router = express.Router();
let B = new Busboy();
router.post('/', Busboy(),(Req, Res)=>{
    //console.log(Req.busboy);
    Req.pipe(Req.busboy);
    Req.busboy.on('file', (filename, file)=>{
        console.log(filename);
        fstream = fs.createWriteStream(path.join(__dirname, '../Imgs/' + filename +'.jpg'));
        file.pipe(fstream);
        fstream.on('close', ()=>{
            Res.send('Noice');
        })
    });
});
module.exports = router;