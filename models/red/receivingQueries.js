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
    SELECT * FROM trx_receiving
    JOIN mst_event ON mst_event.meve_id = trx_receiving.trec_event_id
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
    SELECT * FROM trx_detail_receiving
    WHERE tdrc_receiving_id = '${id}'
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
  // console.log(id)
  try {
    const data = await pool.query(`
    SELECT * FROM trx_receiving
    JOIN mst_event ON mst_event.meve_id = trx_receiving.trec_event_id
    WHERE trec_location_id = '${id}'
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

  // console.log(params[0])
  try {
    // Save Header
    const insertQuery = `
      INSERT INTO trx_receiving(
        trec_event_id,
        trec_date,
        trec_receiver,
        trec_created_at,
        trec_updated_at,
        trec_transaction_id,
        trec_location_id
      )
      VALUES($1, $2, $3, NOW(), NOW(), $4, $5)
    `;
    const values = [
      params[0].event,
      params[0].date,
      params[0].receiver,
      params[0].transaction_id,
      params[0].location_id
    ];

    await pool.query(insertQuery, values);

    // Save Detail and Update Qty
    for (const item of params[0].detail) {
      const insertQueryDetail = `
        INSERT INTO trx_detail_receiving(
          tdrc_receiving_id,
          tdrc_item_id,
          tdrc_qty,
          tdrc_item_name,
          tdrc_created_at,
          tdrc_updated_at
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
          mite_qty = mite_qty + $2,
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