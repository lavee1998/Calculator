const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const calculatorRoutes = express.Router();
let Number = require('./models/number.model');
require('dotenv').config();


//require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


//const uri = process.env.ATLAS_URI;
const uri =  "mongodb+srv://admin:Nokedli44@cluster0.oyt5p.mongodb.net/calculator?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(express.static('client/build'));


const numberRouter = require('./routes/number');
app.use('/number',numberRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

/*
calculatorRoutes.route('/').get(function(req, res) {
    Number.find(function(err, numbers) {
        if (err) {
            console.log(err);
        } else {
            console.log("helloszia");
            res.json(numbers);
        }
    });
});*/

/*
calculatorRoutes.route('/').get((req, res) => {
  Number.find()
    .then(numbers => res.json(numbers))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

/*calculatorRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    console.log(id);
    Number.findOne({id : req.params.id}, function(err, number) {
        if (err) {
            console.log(err);
        } else {
  
            res.json(number);
        }
    })
});*/
/*
calculatorRoutes.route('/update/:id').post(function(req, res) {
    Number.findOne({id : 'calc'}, function(err, number) {
        if (!calculator)
            res.status(404).send('data is not found');
        else
        number.number = req.body.number;
       

        calc.save().then(number => {
                res.json('Number updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});*/

//const exercisesRouter = require('./routes/exercises');
//const usersRouter = require('./routes/users');

//app.use('/exercises', exercisesRouter);
//app.use('/users', usersRouter);
//app.use('/calculator',calculatorRoutes);






/*
const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
 
const { MongoClient } = require("mongodb");
const e = require('express');
 
// Replace the uri string with your MongoDB deployment's connection string.
const uri =  "mongodb+srv://admin:Nokedli44@cluster0.oyt5p.mongodb.net/calculator?retryWrites=true&w=majority";
 
const client = new MongoClient(uri);
 
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
const init = async () => await client.connect();
 
init();
 
const handleError = (res, err) =>
{
  res.writeHead(500, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ err }));
  res.end();
  client.close();
}
 
const saveNumber = async (res, num) =>
{
  if (!client.isConnected()) await init();
 
  try
  {
    const db = client.db('calculator');
    const collection = db.collection('calculator');
    collection.updateOne({ id: 'calc'}, { $set:{ number: num }});
    res.end(JSON.stringify({ number: num }));
  }
  catch (err)
  {
    handleError(res, err);
  }
}
 
const readNumber = async (res) =>
{
  if (!client.isConnected()) await init();
 
  try
  {    
    const db = client.db('calculator');
    const collection = db.collection('calculator');
    collection.findOne({ id: 'calc' }, (err, result) =>
    {
      if (result)
      {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify({number: result.number}));
        res.end()
      }
      else
      {
        handleError(res)
      }
    });
  }
  catch (err)
  {
    handleError(res, err);
  }
}
 
app.post('/save', (req, res) => saveNumber(res, req.body.number));
 
app.get('/read', (req, res) => readNumber(res));
 
app.listen(port, () => { });

*/