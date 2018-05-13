const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 //create beauty schema
const BeautySchema = new Schema({
  name:{
    type:String,
    required:[true,'Name field is required']
  },
  city:{
    type:String
  },
  phone:{
    type:String
  },
  image:{
    type:String
  }
},
{
collection : 'Beauty'
}
);
/*
BeautySchema.methods.speak = function () {
  var greeting = "Hi, I'm "+ this.name
    + ", and I'm " + (this.available?"":"not")
    + " available right now!";
return greeting;
}
*/
//create model
const Beauty = mongoose.model("Beauty",BeautySchema);
//export Beauty model
module.exports = Beauty;
