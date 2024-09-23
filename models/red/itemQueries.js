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
    SELECT * FROM mst_item
    JOIN mst_event ON mst_event.meve_id = mst_item.mite_event_id
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

async function showListByStore(store) {
  try {
    const data = await pool.query(`
    SELECT *
    FROM mst_item
    JOIN mst_event ON mst_event.meve_id  = mst_item.mite_event_id 
    WHERE mst_event.meve_location_id = '${store}';
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

async function showListByEvent(id) {
  // console.log('iii',id)
    try {
        const data = await pool.query(`
        SELECT *
        FROM mst_item
        JOIN mst_event ON mst_event.meve_id  = mst_item.mite_event_id 
        WHERE mst_event.meve_id = '${id}';
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
  

async function showListActiveByStore(store) {
  try {
    const data = await pool.query(`
    SELECT *
    FROM mst_item
    JOIN mst_event ON mst_event.meve_id  = mst_item.mite_event_id 
    WHERE mst_event.meve_location_id = '${store}' AND NOW() BETWEEN mst_event.meve_start_date AND mst_event.meve_end_date;
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
    // console.log(params)
    const insertQuery = `
    INSERT INTO mst_item(
        mite_name,
        mite_event_id,
        mite_locker,
        mite_qty,
        mite_desc,
        mite_created_at,
        mite_updated_at
    )
    VALUES($1, $2, $3, 0, $4, NOW(), NOW())
  `;
//   console.log(insertQuery)
    const values = [
      params.name,
      params.event,
      params.locker,
    //   params.qty,
      params.desc
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
        data: null,
        message: e.toString(),
      };        
    return outputResponse;
  }
}

async function deleteData(id) {
  try {
    await pool.query(`delete from public.mst_item where mite_id = '${id}'`)

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
    // console.log(params)
    const insertQuery = `
    UPDATE mst_item
    SET
    mite_name = $2,
    mite_event_id = $3,
    mite_locker = $4,
    mite_desc = $5,
    mite_updated_at = NOW()
    WHERE mite_id = $1
  `;

    const values = [
      params.id,
      params.name,
      params.event,
      params.locker,
    //   params.qty,
      params.desc
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
        data: null,
        message: e.toString(),
      };        
    return outputResponse;
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