const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const createJWT = require('./createJWT');

const saltRounds = 10;

const app = express();
const PORT = process.env.PORT || 5000;
app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

const path = require("path");
const { ObjectId } = require('mongodb');


require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();


// Login API.
app.post('/api/login', async (req, res, next) => 
{	
  const { login, password } = req.body;
  const database = client.db('OceanLogger').collection('Users');
  const document = await database.findOne({login:login.toLowerCase()});

  // Check for valid login/password/verification.
  if (document == null || await bcrypt.compare(password, document.password) == false)
  {
    return res.status(401).json({error:"Invalid Username/Password."});
  }
  else if (document.verification == false)
  {
    return res.status(401).json({error:"Email is not verified."});
  }

  let payload = {id:document._id, login:document.login, email:document.email};

  // Create a JWT and return it.
  let ret = createJWT.createToken(payload);
  
  res.status(200).json(ret);
});


// Register API.
app.post('/api/register', async (req, res, next) => 
{
  const {login, password, email} = req.body;
  const lowerLogin = login.toLowerCase();
  const lowerEmail = email.toLowerCase();
  const database = client.db("OceanLogger").collection("Users");

  // Check if the username already exists.
  if (await database.findOne({login:lowerLogin}) != null)
  {
    return res.status(409).json({error:"Username already exists."});
  }
  else if (await database.findOne({email:lowerEmail}) != null)
  {
    return res.status(409).json({error:"Email is taken."});
  }

  // Create a unique hash value for verification.
  let val = crypto.randomBytes(32).toString('hex');
  let hashedPassword = await bcrypt.hash(password, saltRounds);

  // Add the info to the database.
  let result = await database.insertOne
  (
    {
      login:lowerLogin,
      password:hashedPassword,
      email:lowerEmail,
      verification:false,
      hash:val,
      resetToken:"",
      "createdAt":new Date()
    }
  );
  
  // Send an email to verify the account.
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  let str = (process.env.NODE_ENV === 'production' ?
  `https://oceanlogger-046c28329f84.herokuapp.com/api/verify/${val}` : `http://localhost:5000/api/verify/${val}`);

  const msg =
  {
    to: email,
    from: "Oceanloggers4331@gmail.com",
    subject: 'OceanLogger Verification',
    html: `<p>Please verify: </p><a href="${str}">${str}</a>`
  };

  sgMail.send(msg)
  .then(() => { console.log('Email sent.'); })
  .catch((error) => { console.error(error); });

  // Returns no error on success.
  res.status(200).json({error:""});
});


// Send Password Reset API.
app.post('/api/sendreset', async (req, res, next) => 
{
  const {email} = req.body;
  const database = client.db("OceanLogger").collection("Users");
  const document = await database.findOne({email:email});

  if (document == null)
  {
    return res.status(401).json({error:"No account associated with email provided."});
  }
  else if (document.verification == false)
  {
    return res.status(401).json({error:"Please verify the email before attempting a password reset."});
  }

  // Generate and store a reset token.
  let token = crypto.randomBytes(32).toString('hex');

  await database.findOneAndUpdate
  (
    {email:email},
    {$set: {resetToken:token}}
  );

  // Send an email with a link to reset.
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  let str = (process.env.NODE_ENV === 'production' ?
  `https://oceanlogger-046c28329f84.herokuapp.com/reset?token=${token}` : `http://localhost:3000/reset?token=${token}`);

  const msg =
  {
    to: email,
    from: "Oceanloggers4331@gmail.com",
    subject: 'OceanLogger Reset Password',
    html: `<p>Reset Link: </p><a href="${str}">${str}</a>`
  };

  sgMail.send(msg)
  .then(() => { console.log('Password Reset Sent.'); })
  .catch((error) => { console.error(error); });

  res.status(200).json({error:""});
});


// Update Password API.
app.post('/api/updatepassword', async (req,res,next) =>
{
  const {token, password} = req.body;
  const database = client.db("OceanLogger").collection("Users");

  // Check for a valid reset token.
  if (token === null || await database.findOne({resetToken:token}) === null)
  {
    return res.status(401).json({error:"Invalid Reset Token."});
  }

  let hashedPassword = await bcrypt.hash(password, saltRounds);

  // Update the password for that token.
  await database.findOneAndUpdate
  (
    {resetToken:token},
    {$set: {password:hashedPassword, resetToken:""}},
  );

  return res.status(200).json({error:""});
});


// Verification API - checks for valid hash.
app.get('/api/verify/:token', async (req, res, next) =>
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
  res.redirect((process.env.NODE_ENV === 'production' ?
  "https://oceanlogger-046c28329f84.herokuapp.com/loginpage" : "http://localhost:3000/loginpage"));
});


// Create Scuba Log API (date = YYYY-MM-DD)
app.post('/api/addlog', async (req,res,next) =>
{
  const {accessToken, userid, title, location, date, diveTime, maxDepth, temperature, visibility, startAirPressure, endAirPressure, diveComputer, notes} = req.body;
  const database = client.db("OceanLogger").collection("DiveLogs");

  // Check for valid JWT.
  if (createJWT.isExpired(accessToken))
  {
    return res.status(401).json({error:"JWT is no longer valid."});
  }

  let result = await database.insertOne
  (
    {
      userid:userid,
      title:title,
      location:location,
      date:date,
      diveTime:diveTime,
      maxDepth:maxDepth,
      temperature:temperature,
      visibility:visibility,
      startAirPressure:startAirPressure,
      endAirPressure:endAirPressure,
      diveComputer:diveComputer,
      notes:notes
    }
  );

  // Create a new JWT.
  let ret = createJWT.refresh(accessToken);
  
  res.status(200).json(ret);
});


// Search Scuba Log API
app.post('/api/searchlog', async (req,res,next) =>
{
  const {accessToken, userid, title, location, startDate, endDate} = req.body;
  const database = client.db("OceanLogger").collection("DiveLogs");

  // Check for valid JWT.
  if (createJWT.isExpired(accessToken))
  {
    return res.status(401).json({error:"JWT is no longer valid."});
  }

  let result;

  if (startDate == "" && endDate == "")
  {
    result = await database.find
      (
        {
          userid:userid,
          title: { $regex: title, $options: 'i'},
          location: { $regex: location, $options: 'i'},
        }
      ).toArray();
  }
  else if(startDate == "" || endDate == "")
  {
    return res.status(200).json({error:"Both date fields must be either filled or empty."});
  }
  else
  {
    result = await database.find
    (
      {
        userid:userid,
        title: { $regex: title, $options: 'i'},
        location: { $regex: location, $options: 'i'},
        date: { $gte: startDate, $lte: endDate }
      }
    ).toArray();
  }

  let ret = createJWT.refresh(accessToken);

  ret.result = result;

  res.status(200).json(ret);
});


// Update Scuba Log API
app.post('/api/updatelog', async (req,res,next) =>
{
  const {accessToken, userid, logid, title, location, date, diveTime, maxDepth, temperature, visibility, startAirPressure, endAirPressure, diveComputer, notes} = req.body;
  const database = client.db("OceanLogger").collection("DiveLogs");

  // Check for valid JWT.
  if (createJWT.isExpired(accessToken))
  {
    return res.status(401).json({error:"JWT is no longer valid."});
  }

  let result = await database.findOneAndUpdate
  (
    {userid:userid, _id:new ObjectId(logid)},
    {
      $set:
      {
        title:title,
        location:location,
        date:date,
        diveTime:diveTime,
        maxDepth:maxDepth,
        temperature:temperature,
        visibility:visibility,
        startAirPressure:startAirPressure,
        endAirPressure:endAirPressure,
        diveComputer:diveComputer,
        notes:notes
      }
    },
    {returnDocument:"after"}
  );

  let ret = createJWT.refresh(accessToken);

  ret.result = result.value;
  
  res.status(200).json(ret);
});


// Delete Scuba Log API
app.delete('/api/deletelog/:logId', async (req, res, next) =>{
  const {logId} = req.params;
  const database = client.db("OceanLogger").collection("DiveLogs");

    const logObjectId = new ObjectId(logId);
    const {deletedCount} = await database.deleteOne({_id: logObjectId});

  if(deletedCount === 1){
    res.status(200).json({message:"Log deleted successfully"});
  }
  else{
    res.status(200).json({error:"Log not found."});
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
