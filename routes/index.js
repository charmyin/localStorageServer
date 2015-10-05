var express = require('express');
var multer  = require('multer');
var mongoose = require('mongoose');
var ImageInfo = mongoose.model('ImageInfo');

var router = express.Router();
var fs = require('fs');
var mkdirp = require('mkdirp');
var baseDir = "D:/images/";
//var rootpath = '/home/ubuntu/morespace/uploadedImage/';
var finalFilePath;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, baseDir)
  },
  filename: function (req, file, cb) {  
  var nowTime = new Date();
  var relativeFileDir = req.body.deviceCpuId+"/"+req.body.cameraSerialId+"/"+nowTime.getMonth()+"_"+nowTime.getDate();
  var fileDir = baseDir+relativeFileDir;
    if (!fs.existsSync(fileDir)){
      mkdirp.sync(fileDir);
    }
    finalFilePath = relativeFileDir+'/' + Date.now()+"."+file.mimetype.split("/")[1];
    cb(null, finalFilePath);
  }
})
var upload = multer({ storage: storage })

router.post('/upload/single', upload.single('file'), function (req, res, next) {
  var imageInfo = new ImageInfo(req.body);
  imageInfo.createTime = new Date();
  imageInfo.uploadTime = new Date();
  imageInfo.path = finalFilePath;
  imageInfo.save(function(){
    res.json({result:"OK"});
  });
  // req.file is the `avatar` file
  
  // req.body will hold the text fields, if there were any
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
