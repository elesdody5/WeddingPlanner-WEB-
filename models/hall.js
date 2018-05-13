const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 //create wedding halls schema
const HallSchema = new Schema({
  name:{
    type:String,
    required:[true,'Name field is required']
  },
  city:{
    type:String
  },
  image:{
    type:String,
    default:"hallDefaultImage.jpg"
  },
  price:{
    type:Number
  },
  capacity:{
    type:Number
  },
},
{
collection : 'Wedding_Halls'
}
);

//create model
const Hall = mongoose.model("Wedding_Halls",HallSchema);
//export the Hall model
module.exports = Hall;
