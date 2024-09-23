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
    const data = await pool.query(`SELECT * FROM trx_redemption`); 

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
  // console.log('ok',id)
  try {
    // console.log(`
    // SELECT * FROM trx_detail_redemption
    // WHERE tdre_redemption_id = '${id}'
    // `); 
    const data = await pool.query(`
    SELECT * FROM trx_detail_redemption
    WHERE tdre_redemption_id = '${id}'
    `); 
    // console.log(data.rows)
    const outputResponse = {
      status: true,
      data: data.rows,
      message: "Get data successful"
    };        
    return outputResponse ;
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
    SELECT * FROM trx_redemption
    WHERE tred_location_id = '${id}'
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
    const data = await pool.query(`
    SELECT count(*) FROM trx_redemption
    WHERE tred_barcode = '${params[0].barcode}'
    `); 

    const outputResponse = {
      status: true,
      data: data.rows,
      message: "Get data successful"
    };  

    if(outputResponse.data[0].count == 0)
    {
      try {
        // Save Header
        const insertQuery = `
          INSERT INTO trx_redemption(
            tred_date,
            tred_barcode,
            tred_created_at,
            tred_updated_at,
            tred_transaction_id,
            tred_location_id
          )
          VALUES(NOW(), $1, NOW(), NOW(), $2, $3)
        `;
        const values = [
          params[0].barcode,
          params[0].transaction_id,
          params[0].location_id
        ];

        await pool.query(insertQuery, values);

        // Save Detail and Update Qty
        for (const item of params[0].detail) {
          const insertQueryDetail = `
            INSERT INTO trx_detail_redemption(
              tdre_redemption_id,
              tdre_item_id,
              tdre_qty,
              tdre_item_name,
              tdre_created_at,
              tdre_updated_at
            )
            VALUES($1, $2, $3, $4, NOW(), NOW())
          `;
          const valuesDetail = [
            params[0].transaction_id,
            item.mite_id,
            item.quantity_order,
            item.mite_name
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

          const valuesCalculate = [item.mite_id, item.quantity_order];

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
    }else{
      const outputResponse = {
        status: false,
        data: null,
        message: e.toString(),
      };        
    return outputResponse;
    }
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
  showList,
  showDetailbyId,
  showListByStore,
  addData
}