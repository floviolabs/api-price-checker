var HttpStatus = require('http-status-codes');
var db = require('../../models/red/itemQueries');
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

async function showListByStore(req, res, next) {
    const { store } = req.body
    try {
        const data = await db.showListByStore(store);
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

async function showListActiveByStore(req, res, next) {
    const { store } = req.body
    try {
        const data = await db.showListActiveByStore(store);
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

async function showListByEvent(req, res, next) {
    // console.log(req.body.id)
    const { id } = req.body
    try {
        const data = await db.showListByEvent(id);
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
    try {
      const data = await db.addData(req.body[0]);

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

  async function updateData(req, res, next) {
    try {
      const data = await db.updateData(req.body[0]);

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

  async function deleteData(req, res, next) {
    const { id } = req.body;
    try {
    
        const data = await db.deleteData(id);

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
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
            error: HttpStatus.getReasonPhrase(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        })        
    }
  }  
  

module.exports = {
    showList,
    showListByStore,
    showListActiveByStore,
    showListByEvent,
    addData,
    deleteData,
    updateData
}