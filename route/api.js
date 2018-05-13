const express = require('express');
const get = require('../auxiliary/get');

//create our router object
const router = express.Router();

//require all our collections(models)
const Beauty = require('../models/beauty');
const Fashion = require('../models/fashion');
const Photographer = require('../models/photographer');
const Hall = require('../models/hall.js');

//require the distance calculator
const distance = require('../auxiliary/distance');

//x will holds the collection in action
var x = undefined;

//Get request
router.get('/:cat',function(req,res,next){



  //find it then send
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

else res.json(xs);
});

});



//post request
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
  //create the document and fill it with req.body
  x.create(req.body).then(function(x){
    //send the added document to indicate success
  res.json(x);
}).catch(next);


});

//update the document of _id=id
router.put('/:cat/:id',function(req,res,next){
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
      res.status(404).josn({ERROR:`no such route "${req.params.cat}"`});
      return;
    }
  }
  //find it then update it then send the old and the new documents
var update = x.findByIdAndUpdate({_id:req.params.id},req.body).then(function(old_x){
  x.findOne({_id:req.params.id}).then(function(new_x){
  res.json({old:old_x,new:new_x});
  });
});

});

//delete request
router.delete('/:cat/:id',function(req,res,next){
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
  //find it then remove it and send it to indicate success
x.findByIdAndRemove({_id:req.params.id}).then(function(x){
res.status(422).json(x?x:{error:`no entry with id of ${req.params.id}`});
});

});



//we need a way to export these routes and use them inside
//index.js
module.exports = router;
