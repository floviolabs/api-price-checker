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
    const data = await pool.query(`
    SELECT * FROM trx_return
    JOIN mst_event ON mst_event.meve_id = trx_return.tret_event_id
    `); 

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

async function showDetailbyId(id) {
  try {
    const data = await pool.query(`
    SELECT * FROM trx_detail_return
    WHERE tdrt_return_id = '${id}'
    `); 

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

async function showListByStore(id) {
  try {
    const data = await pool.query(`
    SELECT * FROM trx_return
    JOIN mst_event ON mst_event.meve_id = trx_return.tret_event_id
    WHERE meve_location_id = '${id}'
    `); 
    
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

async function addData(params) {
  try {
    // Save Header
    const insertQuery = `
      INSERT INTO trx_return(
        tret_event_id,
        tret_date,
        tret_pic,
        tret_receiver,
        tret_created_at,
        tret_updated_at,
        tret_transaction_id,
        tret_location_id
      )
      VALUES($1, $2, $3, $4, NOW(), NOW(), $5, $6)
    `;
    const values = [
      params[0].event,
      params[0].date,
      params[0].pic,
      params[0].receiver,
      params[0].transaction_id,
      params[0].location_id
    ];

    await pool.query(insertQuery, values);

    // Save Detail and Update Qty
    for (const item of params[0].detail) {
      const insertQueryDetail = `
        INSERT INTO trx_detail_return(
          tdrt_return_id,
          tdrt_item_id,
          tdrt_qty,
          tdrt_item_name,
          tdrt_created_at,
          tdrt_updated_at
        )
        VALUES($1, $2, $3, $4, NOW(), NOW())
      `;
      const valuesDetail = [
        params[0].transaction_id,
        item.item_id,
        item.qty,
        item.item_name
      ];

      await pool.query(insertQueryDetail, valuesDetail);

      // Update Qty.
      const updateQueryCalculate = `
        UPDATE mst_item
        SET
          mite_qty = mite_qty - $2,
          mite_updated_at = NOW()
        WHERE mite_id = $1
      `;

      const valuesCalculate = [item.item_id, item.qty];

      await pool.query(updateQueryCalculate, valuesCalculate);
    }

    const outputResponse = {
      status: true,
      message: "Data has been saved"
    };
    return outputResponse;
  } catch (error) {
    console.error('Error inserting data:', error);
    const outputResponse = {
      status: false,
      data: null,
      message: error.toString(),
    };
    return outputResponse;
  }
}

module.exports = {
  showList,
  showDetailbyId,
  showListByStore,
  addData
}