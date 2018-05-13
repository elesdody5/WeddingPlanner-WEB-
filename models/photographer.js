const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 //create photographer schema
const PhotographerSchema = new Schema({
  name:{
    type:String,
    required:[true,'Name field is required']
  },
  location:{
    type:String,
    lowercase: true // Always convert it to lowercase
  },
  number:{
    type:String
  },
  logo:{
    type:String,
    default:"photographerDefaultLogo.jpg"
  },
  wage:{
    type:Number
  }
},
{
collection : 'Photographers'
}
);

//create model
const Photographer = mongoose.model("Photographers",PhotographerSchema);
//export Photographer model
module.exports = Photographer;
