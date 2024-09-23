const async = require("async");
const Pool = require('pg').Pool;

const moment = require('moment-timezone');
const jakartaDateTime = moment().tz('Asia/Jakarta');
const formattedJakartaDateTime = jakartaDateTime.format('YYYY-MM-DD HH:mm:ss');

const pool = new Pool({
  user: process.env.DEV_DATABASE_USERNAME_CCM,
  host: process.env.DEV_DATABASE_HOST_CCM,
  database: process.env.DEV_DATABASE_NAME_CCM,
  password: process.env.DEV_DATABASE_PASSWORD_CCM,
  port: process.env.DEV_DATABASE_PORT_CCM,
});

async function showList() {
  try {
    const data = await pool.query(`SELECT * FROM mst_event;`); 
    const outputResponse = {
      status: true,
      data: data.rows,
      message: "Get data successful"
    };        
    return outputResponse;
  } catch (e) {
    const outputResponse = {
        status: false,
        data: null,
        message: e.toString(),
      };        
    return outputResponse;
  }
}

async function showListByStore(store) {
  try {
    const data = await pool.query(`SELECT * FROM mst_event WHERE meve_location_id = '${store}';`);
    const outputResponse = {
      status: true,
      data: data.rows,
      message: "Get data successful"
    };        
    return outputResponse;
  } catch (e) {
    const outputResponse = {
        status: false,
        data: null,
        message: e.toString(),
      };        
    return outputResponse;
  }
}

async function showListActiveByStore(store) {
  console.log(store)
  try {
    const data = await pool.query(`SELECT * FROM mst_event WHERE meve_location_id = '${store}' AND NOW() BETWEEN meve_start_date AND meve_end_date;`); 
    
    const outputResponse = {
      status: true,
      data: data.rows,
      message: "Get data successful"
    };        
    // console.log(outputResponse)
    return outputResponse;
  } catch (e) {
    const outputResponse = {
        status: false,
        data: null,
        message: e.toString(),
      };        
    return outputResponse;
  }
}

async function addData(params) {
  try {
    const insertQuery = `
    INSERT INTO mst_event(
      meve_name,
      meve_location_id,
      meve_brand,
      meve_start_date,
      meve_end_date,
      meve_created_at,
      meve_updated_at
    )
    VALUES($1, $2, $3, $4, $5, NOW(), NOW())
  `;

    const values = [
      params.name,
      params.location,
      params.brand,
      params.start_date,
      params.end_date
    ];

    try {
      await pool.query(insertQuery, values);
      const outputResponse = {
        status: true,
        message: "Data has been saved"
      };  
      return outputResponse;
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  } catch (e) {
    const outputResponse = {
        status: false,
        message: e.toString(),
      };        
    return outputResponse;
  }
}

async function deleteData(id) {
  try {
    await pool.query(`DELETE FROM mst_event WHERE meve_id = '${id}'`); 
    await pool.query(`DELETE FROM mst_item WHERE mite_event_id = '${id}'`);
    const outputResponse = {
      status: true,
      message: "Delete data successful"
    };        
    return outputResponse;
  } catch (e) {
    const outputResponse = {
        status: false,
        data: null,
        message: e.toString(),
      };        
    return outputResponse;
  }
}

async function updateData(params) {
  try {
    const insertQuery = `
    UPDATE mst_event
    SET
    meve_name = trim($2),
    meve_location_id = $3,
    meve_brand = trim($4),
    meve_start_date = $5,
    meve_end_date = $6,
    meve_updated_at = NOW()
    WHERE meve_id = $1
  `;

    const values = [
      params.id,
      params.name,
      params.location,
      params.brand,
      params.start_date,
      params.end_date
    ];

    try {
      await pool.query(insertQuery, values);
      const outputResponse = {
        status: true,
        message: "Data has been saved"
      };  
      return outputResponse;
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  } catch (e) {
    const outputResponse = {
        status: false,
        message: e.toString(),
      };        
    return outputResponse;
  }
}

module.exports = {
  showList,
  showListByStore,
  showListActiveByStore,
  addData,
  deleteData,
  updateData
}