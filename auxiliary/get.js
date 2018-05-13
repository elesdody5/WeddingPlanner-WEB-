const image = "http://planners.herokuapp.com/images/";
//require all our collections(models)
const Beauty = require('../models/beauty');
const Fashion = require('../models/fashion');
const Photographer = require('../models/photographer');
const Hall = require('../models/hall.js');
var x = undefined;

//
exports.getData = function(model,callback){

  //what category you want?
    switch (model) {
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
      callback(new Error("The url is not found"));
      return null;
      }

  }

  //find it then send
x.find(function (err,xs) {

callback(err,(err)?null:constructObject(xs));
});

};
function constructObject(xs){
var o = {
  status:"OK",
  image_url:image+x.modelName.toLowerCase()+"/",
  model_name:x.modelName.toLowerCase(),
  length:xs.length,
  data:xs,
  time:new Date().toDateString()
};
return o;
}
