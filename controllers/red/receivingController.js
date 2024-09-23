var HttpStatus = require('http-status-codes');
var db = require('../../models/red/receivingQueries');
var output;

async function showList(req, res, next) {
    try {
        const data = await db.showList();
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

async function showDetailbyId(req, res, next) {
    const { id } = req.body
    try {
        const data = await db.showDetailbyId(id);
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

async function showListByStore(req, res, next) {
    const { id } = req.body
    try {
        const data = await db.showListByStore(id);
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


async function addData(req, res, next) {
    // console.log(req.body)
    try {
        const data = await db.addData(req.body);

        if(data.status == true){
        output = {
            status: data.status,
            message: data.message,
            data: data.data
        };
        res.contentType('application/json').status(200);
        var valued = JSON.stringify(output);
        res.send(valued);    
        }         

    } catch (error) {
        output = {
            status: false,
            message: 'Input failed'
        };
        res.contentType('application/json').status(500);
        var valued = JSON.stringify(output);
        res.send(valued); 
    }
}

module.exports = {
    showList,
    showDetailbyId,
    showListByStore,
    addData
}