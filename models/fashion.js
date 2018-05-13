const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 //create fashion schema
const FashionSchema = new Schema({

  brand:{
    type:String,
    required:[true,'brand field is required']
  },
  color:{
    type:String
  },
  price:{
    type:Number
  },
  size:{
  type:String,
  default:"meduim"
},
image:{
type:String,
default:"nan.jpg"
},
lat:{
  type:Number
},
long:{
  type:Number
},
city:{
  type:String
}
},
  {
  collection : 'Fashion'
  }
);
//create Fashion model
const Fashion = mongoose.model("Fashion",FashionSchema);
//export fashion model
module.exports = Fashion;
