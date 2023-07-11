const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;
app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

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

  // Create a unique hash value for verification.
  let val = crypto.randomBytes(32).toString('hex');

  // Add the info to the database.
  let result = await database.insertOne
  (
    {
      firstName:firstName,
      lastName:lastName,
      login:login,
      password:password,
      email:email,
      verification:false,
      hash:val,
      "createdAt":new Date()
    }
  );

  // Send an email to verify the account.
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  let str = "";

  if (process.env.NODE_ENV === 'production')
  {
    str = "https://oceanlogger-046c28329f84.herokuapp.com/verify/" + val;
  }
  else
  {
    str = "http://localhost:5000/verify/" + val;
  }

  const msg =
  {
    to: email,
    from: "Oceanloggers4331@gmail.com",
    subject: 'OceanLogger Verification',
    html: `<p>Please verify: </p><a href="${str}">${str}</a>`
  };

  // Send the message and check for an error.
  sgMail.send(msg)
  .then(() =>
  {
    console.log('Email sent.');
  })
  .catch((error) =>
  {
    console.error(error);
  });

  let id = result.insertedId;

  // Returns this information. Can change this.
  let ret = {id:id, firstName:firstName, lastName:lastName, email:email, error:""};

  res.status(200).json(ret);
});

// Verification API - checks for valid hash.
app.get('/verify/:token', async (req, res, next) =>
{
  // Get the token from the URL.
  const token = req.params.token;

  const database = client.db("OceanLogger").collection("Users");

  // Update the verification if the hash value exists.
  await database.updateOne
  ( {hash:token},
    {$set: {verification:true}}
  );
  
  // Remove the hash value and expiration date.
  await database.updateOne
  ( {hash:token},
    {$unset: {hash:"", "createdAt":""}}
  );

  // Redirect to the login page.
  if (process.env.NODE_ENV === 'production')
  {
    res.redirect("https://oceanlogger-046c28329f84.herokuapp.com/");
  }
  else
  {
    res.redirect("http://localhost:3000/");
  }
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

if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});
