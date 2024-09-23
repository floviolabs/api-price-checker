var HttpStatus = require("http-status-codes");
var output;

const async = require("async");
const Pool = require("pg").Pool;

const moment = require("moment-timezone");
const jakartaDateTime = moment().tz("Asia/Jakarta");
const formattedJakartaDateTime = jakartaDateTime.format("YYYY-MM-DD HH:mm:ss");

const pool = new Pool({
  user: process.env.DEV_DATABASE_USERNAME_PC,
  host: process.env.DEV_DATABASE_HOST_PC,
  database: process.env.DEV_DATABASE_NAME_PC,
  password: process.env.DEV_DATABASE_PASSWORD_PC,
  port: process.env.DEV_DATABASE_PORT_PC,
});

async function check(req, res, next) {
  try {
    const insertQuery = `
            INSERT INTO public.mst_device
                (mdev_device_id, mdev_created_at, mdev_updated_at)
            VALUES($1, current_timestamp, current_timestamp);
        `;
    const validateIdQuery = `
            SELECT mdev_device_id
            FROM public.mst_device
            WHERE mdev_device_id = $1;
        `;
    const validateDataQuery = `
            SELECT
                mdev_store_code,
                mdev_store_name,
				mdev_type,
                mdev_url
            FROM public.mst_device
            WHERE mdev_device_id = $1
            AND mdev_store_code IS NOT NULL
            AND mdev_store_name IS NOT NULL
            AND mdev_url IS NOT NULL
        `;

    const value = [req.body.device_id];

    // validate device id
    console.log("ini validate device");
    const validateIdResult = await pool.query(validateIdQuery, value);

    // if device id does not exist
    if (validateIdResult.rows.length === 0) {
      console.log("ini device not exist");
      try {
        const insertResult = await pool.query(insertQuery, value);
        const output = {
          status: true,
          message: "Data has been saved",
          data: insertResult.data,
        };
        return res.contentType("application/json").status(200).json(output);
      } catch (error) {
        const output = {
          status: false,
          message: "Data failed to save!",
        };
        return res.contentType("application/json").status(500).json(output);
      }
    } else {
      // if device id exists
      console.log("ini device exist");
      const validateDataResult = await pool.query(validateDataQuery, value);

      // if device id configuration is not complete
      if (validateDataResult.rows.length === 0) {
        const output = {
          status: false,
          data: [],
          message: "Data configuration not complete!",
        };
        return res.contentType("application/json").status(200).json(output);
      } else {
        // if device id configuration is complete
        console.log("ini config complete");
        const output = {
          status: true,
          data: validateDataResult.rows,
          message: "Data configuration found.",
        };
        return res.contentType("application/json").status(200).json(output);
      }
    }
  } catch (error) {
    console.log("An unexpected error occurred", error);
    return res.status(500).json({
      status: false,
      message: "An unexpected error occurred",
    });
  }
}

async function insert(req, res, next) {
  try {
    console.log("insert");
  } catch (error) {
    console.log("An unexpected error occurred", error);
    return res.status(500).json({
      status: false,
      message: "An unexpected error occurred",
    });
  }
}

async function validate(req, res, next) {
  try {
    console.log("validate");
  } catch (error) {
    console.log("An unexpected error occurred", error);
    return res.status(500).json({
      status: false,
      message: "An unexpected error occurred",
    });
  }
}

module.exports = {
  check,
  insert,
  validate,
};
