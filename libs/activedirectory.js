const async = require("async");
const config = require('../configs/env.config');

const ActiveDirectory = require('activedirectory2');

var configAD = { url: config.ldap.url,
               baseDN: config.ldap.baseDN,
               username: config.ldap.username,
               password: config.ldap.password }

var ad = new ActiveDirectory(configAD);

function checkLDAP(param) {
  return new Promise(resolve => {

    const username = param.username;
    const password = param.password;

    ad.authenticate(username, password, function(err, auth) {
      if (err) {

        console.log('err!');

        const outputResponse = {
          status: false,
          message: err.lde_message,
        };  

        resolve(outputResponse);
      }
      
      if (auth) {

        console.log('Authenticated!');

        const outputResponse = {
          status: true,
          message: "success",
        };  

        resolve(outputResponse);

      }
      else {
        console.log('Authentication failed!');

        const outputResponse = {
          status: false,
          message: "Authentication failed!",
        };  

        resolve(outputResponse);

      }
    });

  });
  
}


async function ConfigurationLDAP(param){

  try {
    const datanya = await checkLDAP(param);
    return datanya;
    
  } catch (e) {
    const outputResponse = {
        status: 'error',
        data: null,
        message: e.toString(),
    };        
    return outputResponse;
  }

}

module.exports = {
  ConfigurationLDAP
}