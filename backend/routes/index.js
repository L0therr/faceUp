var express = require('express');
var router = express.Router();

var uniqid = require('uniqid');
const fs = require('fs')
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'l0therr',
  api_key: '795632983383424',
  api_secret: 'jrJOjlu3aeN3V_zBE_kr3UcRSn0'
});

router.post('/upload', async (req, res, next) => {
  var id = uniqid();
  await req.files.pic.mv('./tmp/'+id+'.jpg');
  var resultCloud = await cloudinary.uploader.upload('./tmp/'+id+'.jpg');
  fs.unlinkSync('./tmp/'+id+'.jpg');

  res.json({result: true, img: resultCloud});
});




module.exports = router;
