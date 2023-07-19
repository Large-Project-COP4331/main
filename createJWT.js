const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function (payload)
{
    return _createToken(payload);
}

// Creates a token and returns a json object.
_createToken = function (payload)
{
    let ret;

    try
    {
      // const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "24h"});
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
      ret = {accessToken:accessToken, error:""};
    }
    catch(e)
    {
      ret = {error:e.message};
    }

    return ret;
}

// Checks if the token is expired.
exports.isExpired = function( token )
{
   var isError = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, (err, verifiedJwt) =>
   {
     if( err )
     {
       return true;
     }
     else
     {
       return false;
     }
   });

   return isError;
}

// Creates a new token.
exports.refresh = function( token )
{
  var ud = jwt.decode(token,{complete:true});

  let payload = {id:ud.payload.id, login:ud.payload.login, email:ud.payload.email}

  return _createToken(payload);
}
