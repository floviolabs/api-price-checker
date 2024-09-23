var HttpStatus = require('http-status-codes');
var db = require('../../models/red/reportQueries');
var output;

async function stock(req, res, next) {
    try {
        const data = await db.stock();
        if(data.status == true){
        output = {
            status: data.status,
            message: "success",
            data: data.data
        };
        res.contentType('application/json').status(200);
        var valued = JSON.stringify(output);
        res.send(valued);    
        }
    } catch (error) {
        console.log("err");
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
            error: HttpStatus.getReasonPhrase(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        })        
    }
}

async function redemption(req, res, next) {
    try {
        const data = await db.redemption();
        if(data.status == true){
        output = {
            status: data.status,
            message: "success",
            data: data.data
        };
        res.contentType('application/json').status(200);
        var valued = JSON.stringify(output);
        res.send(valued);    
        }
    } catch (error) {
        console.log("err");
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
            error: HttpStatus.getReasonPhrase(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        })        
    }
}

module.exports = {
    stock,
    redemption
}