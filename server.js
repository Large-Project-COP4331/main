const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;
app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const path = require("path");


require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

//login api
app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
	
 let error = '';

 const { login, password } = req.body;
 console.log({login:login,password:password});
 

  const results = await client.db('OceanLogger').collection('Users').find({login:login,password:password}).toArray();
  let id = '';
  let fn = '';
  let ln = '';
  let em = '';
  let vr = '';

  if( results.length > 0 )
  {
    id = results[0].UserID;
    fn = results[0].firstName;
    ln = results[0].lastName;
    em = results[0].email;
    vr = results[0].verification;
  }
  
  let ret = { id:id, firstName:fn, lastName:ln, email:em, verification:vr, error:''};
  res.status(200).json(ret);
});

// Register API.
app.post('/api/register', async (req, res, next) => 
{
  const {firstName, lastName, login, password, email} = req.body;

  const database = client.db("OceanLogger").collection("Users");

  // Check if the username already exists.
  if (await database.findOne({login:login}) != null)
  {
    let ret = {id:"",firstName:"", lastName:"", email:"", error:"Username Already Exists."};
    return res.status(200).json(ret);
  }

  // Add the info to the database.
  let result = await database.insertOne
  (
    {
      firstName:firstName,
      lastName:lastName,
      login:login,
      password:password,
      email:email,
      verification:false
    }
  );

  let id = result.insertedId;

  // Returns this information. Can change this.
  let ret = {id:id, firstName:firstName, lastName:lastName, email:email, error:""};

  res.status(200).json(ret);
});


app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});
