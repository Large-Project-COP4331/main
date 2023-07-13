const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const saltRounds = 10;

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


// Login API.
app.post('/api/login', async (req, res, next) => 
{	
  const { login, password } = req.body;
  const database = client.db('OceanLogger').collection('Users');
  const document = await database.findOne({login:login.toLowerCase()});

  // Check for valid login/password/verification.
  if (document == null || await bcrypt.compare(password, document.password) == false)
  {
    return res.status(200).json({error:"Invalid Username/Password."});
  }
  else if (document.verification == false)
  {
    return res.status(200).json({error:"Email is not verified."});
  }

  // Returns this information.
  let ret =
  {
    id:document._id,
    firstName:document.firstName,
    lastName:document.lastName,
    email:document.email,
    error:""
  };
  
  res.status(200).json(ret);
});


// Register API.
app.post('/api/register', async (req, res, next) => 
{
  const {firstName, lastName, login, password, email} = req.body;
  const lowerLogin = login.toLowerCase();
  const lowerEmail = email.toLowerCase();
  const database = client.db("OceanLogger").collection("Users");

  // Check if the username already exists.
  if (await database.findOne({login:lowerLogin}) != null)
  {
    return res.status(200).json({error:"Username already exists."});
  }
  else if (await database.findOne({email:lowerEmail}) != null)
  {
    return res.status(200).json({error:"Email is taken."});
  }

  // Create a unique hash value for verification.
  let val = crypto.randomBytes(32).toString('hex');
  let hashedPassword = await bcrypt.hash(password, saltRounds);

  // Add the info to the database.
  let result = await database.insertOne
  (
    {
      firstName:firstName,
      lastName:lastName,
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
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  let str = (process.env.NODE_ENV === 'production' ?
  `https://oceanlogger-046c28329f84.herokuapp.com/verify/${val}` : `http://localhost:5000/verify/${val}`);

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

  // Returns this information.
  let ret = {firstName:firstName, lastName:lastName, email:email, error:""};
  res.status(200).json(ret);
});


// Send Password Reset API.
app.post('/api/sendreset', async (req, res, next) => 
{
  const {email} = req.body;
  const database = client.db("OceanLogger").collection("Users");
  const document = await database.findOne({email:email});

  if (document == null)
  {
    return res.status(200).json({error:"No account associated with email provided."});
  }
  else if (document.verification == false)
  {
    return res.status(200).json({error:"Please verify the email before attempting a password reset."});
  }

  // Generate and store a reset token.
  let token = crypto.randomBytes(32).toString('hex');

  await database.findOneAndUpdate
  (
    {email:email},
    {$set: {resetToken:token}}
  );

  // Send an email with a link to reset.
  const sgMail = require('@sendgrid/mail');
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
    return res.status(200).json({error:"Invalid Reset Token."});
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
  res.redirect((process.env.NODE_ENV === 'production' ?
  "https://oceanlogger-046c28329f84.herokuapp.com/" : "http://localhost:3000/"));
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
