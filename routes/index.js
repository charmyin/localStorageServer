var express = require('express');
var multer  = require('multer')
var router = express.Router();
var fs = require('fs');
var mkdirp = require('mkdirp');

var rootpath = '/home/ubuntu/morespace/uploadedImage/';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //#cb(null, 'D:\\images')
    cb(null, rootpath)
  },
  filename: function (req, file, cb) {	
	var nowTime = new Date();
	console.log(req.body.serialNumber)
	console.log(file)
	var relativeFileDir = req.body.serialNumber+"/"+nowTime.getMonth()+"_"+nowTime.getDate();
	var fileDir = rootpath+relativeFileDir;
	console.log(fileDir)
        if (!fs.existsSync(fileDir)){
          mkdirp.sync(fileDir);
       	}
        cb(null, relativeFileDir+'/' + Date.now()+"."+file.mimetype.split("/")[1]);
  }
})
var upload = multer({ storage: storage })

router.post('/upload/single', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  res.json({result:"OK"});
  // req.body will hold the text fields, if there were any
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
