const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 5000

const app = express();

//permit direct order of public files
app.use(express.static(path.join(__dirname,'public')));
app.set('json spaces', 6);
app.set('json replacer',function(key,value){
  if(key==='img' || key==='lat' || key==='long') return undefined;
  return value;
});
//connect to mongodb server mlab
mongoose.connect('mongodb://reda:aboreda@ds151348.mlab.com:51348/wpdb',
  (err,db) => {

  console.log("sucess");
   /*
      var i = 1;
      db.collection('Photographers').find().snapshot().forEach(
        function(doc){
          doc.logo = "photographer"+(i++)+".jpg";
          db.collection('Photographers').save(doc);
        }
      );
   */
   },
  function(err){
  console.log("error connecting the db");
  }
);
mongoose.Promise = global.Promise;
//use the bodyparser to parse the body of the request as a json
app.use(bodyParser.json());
//the following methods will make it /api/ninjas
app.use('/api',require('./route/api'));
app.use(require('./route/api2'));
//error handling middleware
app.use(function(err,req,res,next){
//unprocessable entity error code
res.status(422).send({error:err.message});
});
//app.engine('html', require('ejs').renderFile);


  app.listen(PORT, () => console.log(`Listening on port ${ PORT }`));
