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

async function stock() {
  try {
    const data = await pool.query(`
    SELECT mite_name, mite_qty, meve_name, meve_brand, meve_location_id  FROM mst_item
    JOIN mst_event ON mst_event.meve_id  = mst_item.mite_event_id
    ORDER by mite_name;
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

async function redemption() {
  try {
    const data = await pool.query(`
    SELECT tdre_item_name, tdre_qty, meve_name, meve_location_id, meve_brand, tdre_created_at FROM trx_detail_redemption
    JOIN mst_item ON mst_item.mite_id = trx_detail_redemption.tdre_item_id
    join mst_event on mst_event.meve_id = mst_item.mite_event_id
    order by tdre_created_at DESC
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

module.exports = {
  stock,
  redemption
}