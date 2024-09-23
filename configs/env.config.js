require('dotenv').config();

var env = process.env.DEV_APP_ENV;
console.log("App running on " + env + " mode");
switch(env){
    case "production":
        var config = {
            "dynamic": {
                "key": "fce41ccc93352cd9f296a9c0f4b7ea80",
            },
            "static": {
                "key": "bcfc5bd7c5f68fd848c91b0d6a118172"
            },
            "url": {
                "status": "https://sandbox-api.espay.id/rest/merchant/status"
            },
            "rnp": {
                "host": "10.123.38.13",
                "port": "5432",
                "user": "postgres",
                "password": "@dmin.A30nPentaho",
                "database": "app_wow"
            },   
            "arena": {
                "host": "10.123.38.13",
                "port": "5432",
                "user": "postgres",
                "password": "@dmin.A30nPentaho",
                "database": "app_arena"
            },                     
            "dwh": {
                "host": "10.123.38.13",
                "port": "5432",
                "user": "postgres",
                "password": "@dmin.A30nPentaho",
                "database": "hr"
            },        
            "tic": {
                "host": "10.123.38.13",
                "port": "5432",
                "user": "postgres",
                "password": "@dmin.A30nPentaho",
                "database": "app_tic"
            },                  
            "ldap": {
                "url": process.env.DEV_AD_DOMAIN,
                "baseDN": process.env.DEV_AD_BASEDN,
                "username": process.env.DEV_AD_USERNAME,
                "password": process.env.DEV_AD_PASSWORD
            }            
        }
        break;
    case "development":
        var config = {
            "dynamic": {
                "key": "fce41ccc93352cd9f296a9c0f4b7ea80",
            },
            "static": {
                "key": "bcfc5bd7c5f68fd848c91b0d6a118172"
            },
            "url": {
                "status": "https://sandbox-api.espay.id/rest/merchant/status"
            },
            "rnp": {
                "host": "10.123.38.13",
                "port": "5432",
                "user": "postgres",
                "password": "@dmin.A30nPentaho",
                "database": "app_wow"
            },   
            "arena": {
                "host": "10.123.38.13",
                "port": "5432",
                "user": "postgres",
                "password": "@dmin.A30nPentaho",
                "database": "app_arena"
            },                     
            "dwh": {
                "host": "10.123.38.13",
                "port": "5432",
                "user": "postgres",
                "password": "@dmin.A30nPentaho",
                "database": "hr"
            },    
            "tic": {
                "host": "10.123.38.13",
                "port": "5432",
                "user": "postgres",
                "password": "@dmin.A30nPentaho",
                "database": "app_tic"
            },                    
            "ldap": {
                "url": process.env.DEV_AD_DOMAIN,
                "baseDN": process.env.DEV_AD_BASEDN,
                "username": process.env.DEV_AD_USERNAME,
                "password": process.env.DEV_AD_PASSWORD
            }            
        }
        break;
    default: 
        var config = {
            "dynamic": {
                "key": "fce41ccc93352cd9f296a9c0f4b7ea80",
            },
            "static": {
                "key": "bcfc5bd7c5f68fd848c91b0d6a118172"
            },
            "url": {
                "status": "https://sandbox-api.espay.id/rest/merchant/status"
            },
            "rnp": {
                "host": "10.123.38.13",
                "port": "5432",
                "user": "postgres",
                "password": "@dmin.A30nPentaho",
                "database": "app_wow"
            },   
            "arena": {
                "host": "10.123.38.13",
                "port": "5432",
                "user": "postgres",
                "password": "@dmin.A30nPentaho",
                "database": "app_arena"
            },                     
            "dwh": {
                "host": "10.123.38.13",
                "port": "5432",
                "user": "postgres",
                "password": "@dmin.A30nPentaho",
                "database": "hr"
            },  
            "tic": {
                "host": "10.123.38.13",
                "port": "5432",
                "user": "postgres",
                "password": "@dmin.A30nPentaho",
                "database": "app_tic"
            },                      
            "ldap": {
                "url": process.env.DEV_AD_DOMAIN,
                "baseDN": process.env.DEV_AD_BASEDN,
                "username": process.env.DEV_AD_USERNAME,
                "password": process.env.DEV_AD_PASSWORD
            }            
        }
        break;
}

module.exports = config;