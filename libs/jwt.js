const async = require("async");
const config = require('../configs/env.config');
var jwt = require('jsonwebtoken');

//Json Web Token
const jwtSecretKey = process.env.DEV_TOKEN_KEY;
const jwtExpire = process.env.DEV_TOKEN_EXPIRES_IN;

function checkToken(param) {
  return new Promise(resolve => {

    const verified = jwt.verify(param, jwtSecretKey);

    if(verified){

        const now = Math.floor(Date.now() / jwtExpire);
        if (verified.exp < now) {
          console.log('The token has expired.');
          const outputResponse = {
            status: false,
            message: "Not Successfully Verified",
          };  
  
          resolve(outputResponse);            
        } else {
          const outputResponse = {
            status: true,
            message: "Successfully Verified",
          };  
  
          resolve(outputResponse);            
        }     
       
    }else{

        const outputResponse = {
          status: false,
          message: "Not Successfully Verified",
        };  

        resolve(outputResponse);         
      
    }

  });
  
}


async function ConfigurationToken(param){

  try {
    const datanya = await checkToken(param);
    return datanya;
    
  } catch (e) {
    const outputResponse = {
        status: false,
        data: null,
        message: e.toString(),
    };        
    return outputResponse;
  }

}

module.exports = {
  ConfigurationToken
}