const express = require('express');
const formidable = require("formidable");
const get = require('../auxiliary/get');
const path = require('path');
const ejs = require('ejs');
//create our router object
const router = express.Router();
const fs = require('fs');
//require all our collections(models)
const Beauty = require('../models/beauty');
const Fashion = require('../models/fashion');
const Photographer = require('../models/photographer');
const Hall = require('../models/hall.js');


//x will holds the collection in action
var x = undefined;

//pages
router.get('/',(req,res)=> res.sendFile(path.resolve(__dirname+'/../views/index.html')));
router.get('/:cat', (req, res) => {
  get.getData(req.params.cat,function (err,xs) {

    if(err){res.status(404).json({ERROR:err.message}); return;}
    //if he wants the nearest first, here we go!
    if((req.query.long && req.query.lat)){
      console.log("sort equals " + req.query.lat + " " + req.query.long);
  xs.sort(function(o1,o2){
    var dis1 = distance(o1.lat,o1.long,parseFloat(req.query.lat),parseFloat(req.query.long));
    var dis2 = distance(parseFloat(req.query.lat),parseFloat(req.query.long),o2.lat,o2.long);
    return  dis1 - dis2;
  });
  }

  else if(xs.model_name === 'fashion') res.render('../views/fashion.ejs',{xs:xs});
  else if(xs.model_name === 'beauty') {res.render('../views/beauty.ejs',{xs:xs});}
  else if(xs.model_name === 'photographers') {res.render('../views/photographers.ejs',{xs:xs});}
  else   res.render('../views/halls.ejs',{xs:xs});
  });


});









router.post('/:cat',function(req,res,next){

  //what category you want?
  switch(req.params.cat){
    case "beauty":
      x = Beauty;
      break;
    case "fashion":
      x = Fashion;
      break;
    case "photographers":
      x = Photographer;
      break;
    case "halls":
      x = Hall;
      break;
      default:
      {
      res.status(404).json({ERROR:`no such route "${req.params.cat}"`});
      return;
    }
  }

x.find(function(err,xs){
  var count; //holds the number of elements in the db
  count = xs.length;
  var body = {};

  //analyse form -------------------------
  var form = new formidable.IncomingForm();
  form.uploadDir = "./uploaded";
  form.keepExtensions = true;
  //analyse the form >>files + fields
form.parse(req, function (err, fields, files) {
 if(files.image){
  var oldpath = files.image.path;
  var cat = req.params.cat;

  var img = ((cat.charAt(cat.length-1)==='s')?cat.substring(0, cat.length - 1) :cat) +  (count+1)+".jpg";
  console.log(x.modelName);
  var newpath =  './public/images/'+x.modelName.toLowerCase()+ '/' + img; //+ files.filetoupload.name;
  fs.rename(oldpath, newpath, function (err) {
    if (err) throw err;
  console.log(`successfully moved from ${oldpath} to ${newpath}`);
});
  if(req.params.cat==='photographers')
  body.logo = img;
  else
  body.image = img;
}
//copy fields to the body
for(var k in fields) body[k]=fields[k];

//create the document and fill it with body
x.create(body).then(function(x){

res.status(200).send('<p>we added your data <span style="color:red">&#9825;</p>');
}).catch(next);
});
/////////////////////////////////////


});
});



//we need a way to export these routes and use them inside
//index.js
module.exports = router;
